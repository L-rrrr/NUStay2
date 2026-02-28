import { Rating, Map, Slider } from '../../hostels';
import Comments from './Comments';
import './HostelInfo.css';

const HostelInfo = ({ hostel, hostelId, isSaved, isSaving, saveError, onSave }) => {

  const numberOfRatings = hostel.ratings.length;

  return (
    <div className="hostel-info-page">
      <div className="hostel-info-left">
        <h1 className="title"><strong>{hostel.name}</strong></h1>
        <div className="hostel-info-image">
          <Slider images={hostel.imageUrls} />
        </div>
        <div className="hostel-info-details">
          <p><strong>Type:</strong> {hostel.type}</p>
          <p><strong>Price:</strong> ${hostel.price} / month</p>
          <p><strong>Average rating:</strong> {Number(hostel.averageRating).toFixed(1)} ({numberOfRatings})</p>
          <p><strong>Meal Plan:</strong> {hostel.mealPlan}</p>
          <p><strong>Academic Programmes:</strong> {hostel.academicProgrammes}</p>
          <p><strong>Hostel Activities:</strong> {hostel.hostelActivities}</p>
          <p><strong>Description:</strong> {hostel.description}</p>
          <Rating hostelId={hostelId} />
          <div
            className={`save-button-container ${isSaved ? 'saved' : ''}`}
            onClick={onSave}
            aria-disabled={isSaving}
          >
            <span>{isSaved ? 'Hostel saved ' : 'Save this hostel '}</span>
            <img src="/save.png" alt="Save" />
          </div>
          {saveError && <p>{saveError}</p>}
        </div>
      </div>
      <div className="hostel-info-right">
        <div className="map-container">
          <Map items={[hostel]} />
        </div>
        <div className="comments-container">
          <Comments postId={hostelId} />
        </div>
      </div>
    </div>
  );
};

export default HostelInfo;
