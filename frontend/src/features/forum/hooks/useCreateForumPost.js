import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { DEFAULT_PROFILE_PHOTO } from '../../comments';

const MAX_TITLE_LENGTH = 50;

const useCreateForumPost = ({ currentUser, onSuccess }) => {
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onTitleChange = (event) => {
    const title = event.target.value;

    if (title.length > MAX_TITLE_LENGTH) {
      setErrorMessage('Title must be less than 50 characters.');
      return;
    }

    setErrorMessage('');
    setPostTitle(title);
  };

  const onBodyChange = (event) => {
    setErrorMessage('');
    setPostBody(event.target.value);
  };

  const onSubmit = async () => {
    if (!currentUser) {
      setErrorMessage('You must be logged in to create a post.');
      return;
    }

    if (!postTitle.trim() || !postBody.trim()) {
      setErrorMessage('Please fill in both post title and post body.');
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await addDoc(collection(db, 'forumPosts'), {
        title: postTitle.trim(),
        body: postBody.trim(),
        createdAt: serverTimestamp(),
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: currentUser.displayName || currentUser.email,
        photoURL: currentUser.photoURL || DEFAULT_PROFILE_PHOTO,
        upvotes: 0,
        upvotedBy: [],
      });

      setPostTitle('');
      setPostBody('');
      onSuccess?.();
    } catch (error) {
      setErrorMessage('Unable to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    postTitle,
    postBody,
    isSubmitting,
    errorMessage,
    onTitleChange,
    onBodyChange,
    onSubmit,
  };
};

export default useCreateForumPost;
