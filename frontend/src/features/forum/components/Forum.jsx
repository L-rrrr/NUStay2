import { NavLink } from 'react-router-dom';
import Post from './Post';
import './Forum.css';

const Forum = ({ posts, isLoading, errorMessage }) => {
  if (isLoading) {
    return <div className="forum-content-container">Loading forum posts...</div>;
  }

  if (errorMessage) {
    return <div className="forum-content-container">{errorMessage}</div>;
  }

  return (
    <div className="forum-content-container">
      <h2 className="forum-title">Forum</h2>
      <NavLink to="/forum/createpost" className="create-post-button">Create Post</NavLink>
      <div className="forum-posts-container">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Forum;
