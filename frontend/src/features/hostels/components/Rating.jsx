import { useState, useEffect } from 'react';
import Stars from './Stars';
import apiRequest from '../../../lib/apiRequest';
import { useAuth } from '../../../contexts/authContext';
import './Rating.css';

const Rating = ({ hostelId }) => {
  const { currentUser } = useAuth();
  const [rating, setRating] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await apiRequest.get(`/hostels/${hostelId}`);
        const hostel = response.data;
        const userRating = hostel.ratings?.find((entry) => entry.userId === currentUser?.uid);
        if (userRating) {
          setRating(userRating.rating);
        }
      } catch (error) {
        console.error('Error fetching rating:', error);
      }
    };

    fetchRating();
  }, [hostelId, currentUser]);

  const handleRating = async (newRating) => {
    if (!currentUser?.uid) {
      alert('Please log in to rate this hostel');
      return;
    }

    try {
      await apiRequest.post(`/hostels/rate-hostel/${hostelId}`, {
        userId: currentUser.uid,
        rating: Number(newRating),
      });

      setRating(newRating);
      setEditMode(false);
    } catch (error) {
      console.error('Error rating hostel:', error);
      alert('Failed to rate hostel');
    }
  };

  const deleteRating = async () => {
    if (!currentUser?.uid) {
      alert('Please log in to delete your rating');
      return;
    }

    try {
      await apiRequest.delete(`/hostels/${hostelId}/ratings/${currentUser.uid}`);
      setRating(null);
      setEditMode(false);
    } catch (error) {
      console.error('Error deleting rating:', error);
      alert('Failed to delete rating');
    }
  };

  return (
    <div className="rating-container">
      {rating && !editMode ? (
        <div className="user-rating">
          <p>Your rating for this hostel is {rating} stars</p>
          <button onClick={() => setEditMode(true)} className="edit-button">Edit</button>
          <button onClick={deleteRating} className="delete-button">Delete</button>
        </div>
      ) : (
        <div className="rating-edit">
          <p>Rate from 1-5 for this hostel: </p>
          <Stars
            count={5}
            defaultRating={rating}
            icon="★"
            color="yellow"
            iconSize={24}
            onRating={handleRating}
          />
          {editMode && <button onClick={() => setEditMode(false)} className="cancel-button">Cancel</button>}
        </div>
      )}
    </div>
  );
};

export default Rating;
