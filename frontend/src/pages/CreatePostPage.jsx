import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { CreatePost, useCreateForumPost } from '../features/forum';

const CreatePostPage = () => {
	const navigate = useNavigate();
	const { currentUser, userLoggedIn } = useAuth();

	const {
		postTitle,
		postBody,
		isSubmitting,
		errorMessage,
		onTitleChange,
		onBodyChange,
		onSubmit,
	} = useCreateForumPost({
		currentUser,
		onSuccess: () => navigate('/forum'),
	});

	if (!userLoggedIn) {
		return <Navigate to="/login" replace />;
	}

	return (
		<CreatePost
			postTitle={postTitle}
			postBody={postBody}
			onTitleChange={onTitleChange}
			onBodyChange={onBodyChange}
			onSubmit={onSubmit}
			isSubmitting={isSubmitting}
			errorMessage={errorMessage}
		/>
	);
};

export default CreatePostPage;
