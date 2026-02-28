import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { ForumComments as Comments, useForumPostCommentsData } from '../features/forum';

const ForumCommentsPage = () => {
	const navigate = useNavigate();
	const { postId } = useParams();
	const { currentUser } = useAuth();

	const {
		post,
		comments,
		displayName,
		photoURL,
		isLoading,
		errorMessage,
	} = useForumPostCommentsData({
		postId,
		currentUser,
	});

	return (
		<Comments
			postId={postId}
			post={post}
			comments={comments}
			displayName={displayName}
			photoURL={photoURL}
			isLoading={isLoading}
			errorMessage={errorMessage}
			onBack={() => navigate('/forum')}
		/>
	);
};

export default ForumCommentsPage;
