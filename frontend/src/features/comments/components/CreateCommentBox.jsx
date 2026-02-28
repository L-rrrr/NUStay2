import { useAuth } from '../../../contexts/authContext';
import { useCreateComment } from '../index';

const CreateCommentBox = ({ collectionName, postId }) => {
  const { currentUser } = useAuth();
  const { comment, setComment, submitComment } = useCreateComment({
    collectionName,
    postId,
    currentUser,
  });

  return (
    <div id="create-comment-container">
      <textarea
        placeholder="Write a comment"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        id="create-comment-input"
      />
      <button id="submit-comment-button" onClick={submitComment}>Submit</button>
    </div>
  );
};

export default CreateCommentBox;
