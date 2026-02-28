import { CommentThreadItem, CreateCommentBox, useRealtimeComments } from '../../comments';
import './Comment.css';
import './CreateComment.css';
import './Comments.css';

const Comments = ({ postId }) => {
  const comments = useRealtimeComments({
    collectionName: 'posts',
    postId,
    orderRules: [['upvotes', 'desc'], ['createdAt', 'asc']],
  });

  return (
    <div id="comments-container">
      <CreateCommentBox collectionName="posts" postId={postId} />
      <section id="current-comments-container">
        {comments.map((comment) => (
          <CommentThreadItem
            key={comment.id}
            postId={postId}
            comment={comment}
            collectionName="posts"
            repliesOrder="asc"
          />
        ))}
      </section>
    </div>
  );
};

export default Comments;
