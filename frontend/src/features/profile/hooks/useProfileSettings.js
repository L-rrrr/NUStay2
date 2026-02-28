import { useEffect, useState } from 'react';
import { uploadPhoto, updateUsername } from '../../../firebase/auth';

const DEFAULT_PROFILE_PHOTO = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';

const useProfileSettings = ({ currentUser, setCurrentUser }) => {
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState(DEFAULT_PROFILE_PHOTO);
  const [username, setUsername] = useState(currentUser?.displayName || '');
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }

    if (currentUser?.displayName) {
      setUsername(currentUser.displayName);
    }
  }, [currentUser]);

  const handleChange = (event) => {
    if (event.target.files[0]) {
      setPhoto(event.target.files[0]);
      setPhotoURL(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleUpload = async () => {
    setErrorMessage('');
    await uploadPhoto(photo, currentUser, setLoading, setCurrentUser);
  };

  const handleUsernameUpdate = async () => {
    if (username.length > 10) {
      setErrorMessage('Username must be less than 10 characters.');
      return;
    }

    if (username.trim() === '') {
      setErrorMessage('Username cannot be empty.');
      return;
    }

    setErrorMessage('');
    setUsernameLoading(true);
    await updateUsername(username, currentUser, setUsernameLoading, setCurrentUser);
  };

  return {
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
  };
};

export default useProfileSettings;
