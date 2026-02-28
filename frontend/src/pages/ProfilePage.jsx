import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { Profile, useProfileSettings } from '../features/profile';

const ProfilePage = () => {
	const { currentUser, setCurrentUser, userLoggedIn } = useAuth();
	const {
		photo,
		loading,
		photoURL,
		username,
		usernameLoading,
		errorMessage,
		setUsername,
		handleChange,
		handleUpload,
		handleUsernameUpdate,
	} = useProfileSettings({ currentUser, setCurrentUser });

	if (!userLoggedIn) {
		return <Navigate to="/login" replace />;
	}

	return (
		<Profile
			currentUser={currentUser}
			photo={photo}
			loading={loading}
			photoURL={photoURL}
			username={username}
			usernameLoading={usernameLoading}
			errorMessage={errorMessage}
			onUsernameChange={setUsername}
			onPhotoChange={handleChange}
			onUpload={handleUpload}
			onUsernameUpdate={handleUsernameUpdate}
		/>
	);
};

export default ProfilePage;
