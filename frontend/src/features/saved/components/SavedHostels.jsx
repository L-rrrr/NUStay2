import React from 'react';
import { Card } from '../../hostels';
import './savedHostels.css';

const SavedHostels = ({ savedHostels }) => {
  return (
    <div className="saved-hostels-page">
      <h2>My Saved Hostels</h2>
      <div className="saved-hostels-container">
        {savedHostels.map((hostel) => (
          <Card key={hostel._id} item={hostel} />
        ))}
      </div>
    </div>
  );
};

export default SavedHostels;
