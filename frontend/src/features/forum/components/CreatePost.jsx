import { NavLink } from 'react-router-dom';
import './CreatePost.css';

const CreatePost = ({ postTitle, postBody, onTitleChange, onBodyChange, onSubmit, isSubmitting, errorMessage }) => {

  return (
    <div id="create-post-container">
      <h2 id="create-post-heading">Create a post</h2>
      <div id="create-post-input-container">
        <textarea
          className="create-post"
          id="create-post-title"
          value={postTitle}
          onChange={onTitleChange}
          placeholder="Title of post (max 50 characters)"
          maxLength={50}
        />
        <textarea
          className="create-post"
          id="create-post-body"
          value={postBody}
          onChange={onBodyChange}
          placeholder="Write down your thoughts here :)"
        />
      </div>
      {errorMessage && <p>{errorMessage}</p>}
      <div id="buttons-container">
        <button className="button-create-post-page">
          <NavLink id="nav-link-back-to-forum" to="/forum">Back to forum</NavLink>
        </button>
        <button className="button-create-post-page" onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create Post'}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
