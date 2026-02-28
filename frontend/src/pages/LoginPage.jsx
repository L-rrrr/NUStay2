import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { Login } from '../features/auth';

const LoginPage = () => {
	const { userLoggedIn } = useAuth();

	if (userLoggedIn) {
		return <Navigate to="/home" replace />;
	}

	return <Login />;
};

export default LoginPage;
