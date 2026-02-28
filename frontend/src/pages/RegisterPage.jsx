import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { Register } from '../features/auth';

const RegisterPage = () => {
	const { userLoggedIn } = useAuth();

	if (userLoggedIn) {
		return <Navigate to="/home" replace />;
	}

	return <Register />;
};

export default RegisterPage;
