import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';

const useForumPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const postsQuery = query(
        collection(db, 'forumPosts'),
        orderBy('upvotes', 'desc'),
        orderBy('createdAt', 'desc'),
      );

      const unsubscribe = onSnapshot(
        postsQuery,
        (querySnapshot) => {
          const postsArray = [];
          querySnapshot.forEach((postDoc) => {
            postsArray.push({ ...postDoc.data(), id: postDoc.id });
          });
          setPosts(postsArray);
          setIsLoading(false);
        },
        () => {
          setErrorMessage('Unable to load forum posts.');
          setIsLoading(false);
        },
      );

      return () => unsubscribe();
    } catch (error) {
      setErrorMessage('Unable to load forum posts.');
      setIsLoading(false);
      return undefined;
    }
  }, []);

  return {
    posts,
    isLoading,
    errorMessage,
  };
};

export default useForumPosts;
