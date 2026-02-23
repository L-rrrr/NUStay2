import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/authContext';
import { useHostels } from '../../contexts/HostelContext';
import Card from '../card/Card';
import './savedHostels.css';

const SavedHostels = () => {
  const { currentUser } = useAuth();
  const { hostels } = useHostels();
  const [savedHostels, setSavedHostels] = useState([]);

  useEffect(() => {
    const userSavedHostels = hostels.filter(hostel => hostel.savedBy.includes(currentUser.uid));
    setSavedHostels(userSavedHostels);
  }, [hostels, currentUser.uid]);

  return (
    <div className="saved-hostels-page">
      <h2>My Saved Hostels</h2>
      <div className="saved-hostels-container">
        {savedHostels.map(hostel => (
          <Card key={hostel._id} item={hostel} />
        ))}
      </div>
    </div>
  );
};

export default SavedHostels;
