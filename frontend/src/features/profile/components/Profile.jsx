import './profile.css';

export default function Profile({
  currentUser,
  photo,
  loading,
  photoURL,
  username,
  usernameLoading,
  errorMessage,
  onUsernameChange,
  onPhotoChange,
  onUpload,
  onUsernameUpdate,
}) {

  return (
    <div className="fields">
      <input
        type="text"
        value={username}
        onChange={(event) => onUsernameChange(event.target.value)}
        placeholder="Update your username here"
        disabled={usernameLoading}
        className="username-input"
        maxLength={10}
      />
      <button
        className={usernameLoading ? 'disabled' : ''}
        disabled={usernameLoading}
        onClick={onUsernameUpdate}
      >
        Update Username
      </button>
      {errorMessage && <p>{errorMessage}</p>}
      <p>Your current username is: {currentUser?.displayName}</p>
      <label htmlFor="fileInput" className={`choose-file-button ${loading ? 'disabled' : ''}`}>
        Choose Profile Image
        <input id="fileInput" type="file" onChange={onPhotoChange} disabled={loading} />
      </label>
      <div className="avatar-container">
        <img src={photoURL} alt="Avatar" className="avatar" />
      </div>
      <button
        className={`upload-button ${loading ? 'disabled' : ''}`}
        disabled={loading || !photo}
        onClick={onUpload}
      >
        Click to Upload
      </button>
    </div>
  );
}
