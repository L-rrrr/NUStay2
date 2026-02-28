import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { useRealtimeComments } from '../../comments';

const useForumPostCommentsData = ({ postId, currentUser }) => {
  const [post, setPost] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const comments = useRealtimeComments({
    collectionName: 'forumPosts',
    postId,
    orderRules: [['upvotes', 'desc'], ['createdAt', 'desc']],
  });

  useEffect(() => {
    if (!postId) {
      setErrorMessage('Invalid post id.');
      setIsLoading(false);
      return;
    }

    const fetchPost = async () => {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const postDoc = await getDoc(doc(db, 'forumPosts', postId));

        if (!postDoc.exists()) {
          setErrorMessage('Post not found.');
          setPost(null);
          return;
        }

        const postData = postDoc.data();
        setPost(postData);
      } catch (error) {
        setErrorMessage('Unable to load post details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  useEffect(() => {
    if (!post) return;

    const resolveAuthor = async () => {
      if (currentUser?.uid === post.uid) {
        setDisplayName(currentUser.displayName || 'Anonymous user');
        setPhotoURL(currentUser.photoURL || '');
        return;
      }

      if (!post.uid) {
        setDisplayName('Anonymous user');
        setPhotoURL('');
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', post.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setDisplayName(userData.displayName || 'Anonymous user');
          setPhotoURL(userData.photoURL || '');
        } else {
          setDisplayName('Anonymous user');
          setPhotoURL('');
        }
      } catch (error) {
        setDisplayName('Anonymous user');
        setPhotoURL('');
      }
    };

    resolveAuthor();
  }, [currentUser, post]);

  return {
    post,
    comments,
    displayName,
    photoURL,
    isLoading,
    errorMessage,
  };
};

export default useForumPostCommentsData;
