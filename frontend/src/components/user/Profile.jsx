import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { uploadPhoto, updateUsername } from "../../firebase/auth"; 
import "./profile.css";

export default function Profile() {
  const { currentUser, setCurrentUser } = useAuth(); // Extract setCurrentUser to update state
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");
  const [username, setUsername] = useState(currentUser?.displayName || "");
  const [usernameLoading, setUsernameLoading] = useState(false);

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
      setPhotoURL(URL.createObjectURL(e.target.files[0])); // Preview the selected image
    }
  }

  async function handleUpload() {
    await uploadPhoto(photo, currentUser, setLoading, setCurrentUser);
  }

  async function handleUsernameUpdate() {
    if (username.length > 10) {
      alert("Username must be less than 10 characters!");
      return;
    }

    if (username.trim() === "") {
      alert("Username cannot be empty!");
      return;
    }

    setUsernameLoading(true);
    await updateUsername(username, currentUser, setUsernameLoading, setCurrentUser);
  }

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
    if (currentUser?.displayName) {
      setUsername(currentUser.displayName);
    }
  }, [currentUser]);

  return (
    <div className="fields">
      <input 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        placeholder="Update your username here"
        disabled={usernameLoading}
        className="username-input"
        maxLength={10} 
      />
      <button 
        className={usernameLoading ? 'disabled' : ''} 
        disabled={usernameLoading} 
        onClick={handleUsernameUpdate}
      >
        Update Username
      </button>
      <p>Your current username is: {currentUser?.displayName}</p>
      <label htmlFor="fileInput" className={`choose-file-button ${loading ? 'disabled' : ''}`}>
        Choose Profile Image
        <input id="fileInput" type="file" onChange={handleChange} disabled={loading} />
      </label>
      <div className="avatar-container">
        <img src={photoURL} alt="Avatar" className="avatar" />
      </div>
      <button 
        className={`upload-button ${loading ? 'disabled' : ''}`} 
        disabled={loading || !photo} 
        onClick={handleUpload}
      >
        Click to Upload
      </button>
    </div>
  );
}

