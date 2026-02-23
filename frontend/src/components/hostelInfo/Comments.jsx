import React, { useState, useEffect } from 'react';
import { db } from "../../firebase/firebase";
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import CreateComment from './CreateComment';
import Comment from './Comment';
import './Comments.css';

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts", postId, "comments"), orderBy('upvotes', 'desc'), orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let comments = [];
      querySnapshot.forEach((doc) => {
        comments.push({ ...doc.data(), id: doc.id });
      });
      setComments(comments);
    });

    return () => unsubscribe();
  }, [postId]);

  return (
    <div id="comments-container">
      <CreateComment postId={postId} />
      <section id="current-comments-container">
        {comments.map((comment) => (
          <Comment key={comment.id} postId={postId} comment={comment} />
        ))}
      </section>
    </div>
  );
};

export default Comments;
