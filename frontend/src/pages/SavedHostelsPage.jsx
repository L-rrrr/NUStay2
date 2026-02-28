import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { SavedHostels, useSavedHostels } from '../features/saved';

const SavedHostelsPage = () => {
	const { currentUser, userLoggedIn } = useAuth();
	const { savedHostels } = useSavedHostels({ userId: currentUser?.uid });

	if (!userLoggedIn) {
		return <Navigate to="/login" replace />;
	}

	return <SavedHostels savedHostels={savedHostels} />;
};

export default SavedHostelsPage;
