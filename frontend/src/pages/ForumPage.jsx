import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { Forum, useForumPosts } from '../features/forum';

const ForumPage = () => {
	const { userLoggedIn } = useAuth();
	const { posts, isLoading, errorMessage } = useForumPosts();

	if (!userLoggedIn) {
		return <Navigate to="/login" replace />;
	}

	return <Forum posts={posts} isLoading={isLoading} errorMessage={errorMessage} />;
};

export default ForumPage;
