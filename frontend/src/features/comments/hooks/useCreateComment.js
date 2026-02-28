import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { DEFAULT_PROFILE_PHOTO } from '../constants';

const useCreateComment = ({ collectionName, postId, currentUser }) => {
  const [comment, setComment] = useState('');

  const submitComment = async () => {
    const trimmedComment = comment.trim();
    if (!trimmedComment || !currentUser || !postId) return;

    await addDoc(collection(db, collectionName, postId, 'comments'), {
      comment: trimmedComment,
      createdAt: serverTimestamp(),
      uid: currentUser.uid,
      email: currentUser.email,
      displayName: currentUser.displayName || currentUser.email,
      photoURL: currentUser.photoURL || DEFAULT_PROFILE_PHOTO,
      upvotes: 0,
    });

    setComment('');
  };

  return {
    comment,
    setComment,
    submitComment,
  };
};

export default useCreateComment;
