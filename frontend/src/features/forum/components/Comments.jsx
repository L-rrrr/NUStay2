import { CommentThreadItem, CreateCommentBox, DEFAULT_PROFILE_PHOTO } from '../../comments';
import './Comment.css';
import './Comments.css';

const Comments = ({ postId, post, comments, displayName, photoURL, isLoading, errorMessage, onBack }) => {
  if (isLoading) {
    return <div className="comments-page-container">Loading...</div>;
  }

  if (errorMessage) {
    return <div className="comments-page-container">{errorMessage}</div>;
  }

  return (
    <div className="comments-page-container">
      <button className="back-button" onClick={onBack}>Back to Forum</button>
      {post && (
        <div className="post-details">
          <h2 className="post-title">{post.title}</h2>
          <div className="post-user-info">
            <img src={photoURL || DEFAULT_PROFILE_PHOTO} alt="User Profile" className="post-user-profile" />
            <p>Posted by: {displayName}</p>
          </div>
          <div className="post-content">
            <p>{post.body}</p>
          </div>
        </div>
      )}
      <CreateCommentBox collectionName="forumPosts" postId={postId} />
      <div className="current-comments-container">
        {comments.map((comment) => (
          <CommentThreadItem
            key={comment.id}
            postId={postId}
            comment={comment}
            collectionName="forumPosts"
            repliesOrder="desc"
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
