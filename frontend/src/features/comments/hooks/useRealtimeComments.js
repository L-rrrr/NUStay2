import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';

const useRealtimeComments = ({ collectionName, postId, orderRules }) => {
  const [comments, setComments] = useState([]);
  const orderRulesKey = (orderRules || [])
    .map(([field, direction]) => `${field}:${direction}`)
    .join('|');

  useEffect(() => {
    if (!postId) return undefined;

    const constraints = (orderRules || []).map(([field, direction]) => orderBy(field, direction));
    const commentsQuery = query(
      collection(db, collectionName, postId, 'comments'),
      ...constraints
    );

    const unsubscribe = onSnapshot(commentsQuery, (querySnapshot) => {
      const nextComments = [];
      querySnapshot.forEach((commentDoc) => {
        nextComments.push({ ...commentDoc.data(), id: commentDoc.id });
      });
      setComments(nextComments);
    });

    return () => unsubscribe();
  }, [collectionName, postId, orderRulesKey]);

  return comments;
};

export default useRealtimeComments;
