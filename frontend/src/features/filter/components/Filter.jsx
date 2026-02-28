import './filter.scss';

const Filter = ({
  propertyType,
  roomType,
  minPrice,
  maxPrice,
  minRating,
  mealPlan,
  academicPrograms,
  hostelActivities,
  airCon,
  errorMessage,
  setPropertyType,
  setRoomType,
  setMinPrice,
  setMaxPrice,
  setMinRating,
  setMealPlan,
  setAcademicPrograms,
  setHostelActivities,
  setAirCon,
  toggleSelection,
  onApplyFilter,
}) => {

  return (
    <div className="filter-page">
      <h2>Filter Hostels</h2>
      <div className="filter-container">
        <div className="filter-row">
          <div className="filter-item">
            <label>Property Type</label>
            <div className="button-group">
              {['House', 'Hall', 'Residence', 'Residential College'].map((type) => (
                <button
                  key={type}
                  className={`filter-button ${propertyType.includes(type) ? 'selected' : ''}`}
                  onClick={() => toggleSelection(propertyType, setPropertyType, type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-item">
            <label>Room Type</label>
            <div className="button-group">
              {['Single', 'Double', 'Apt'].map((type) => (
                <button
                  key={type}
                  className={`filter-button ${roomType.includes(type) ? 'selected' : ''}`}
                  onClick={() => toggleSelection(roomType, setRoomType, type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-item">
            <label>Air-con</label>
            <div className="button-group">
              {['(AC)', '(Non-AC)'].map((option) => (
                <button
                  key={option}
                  className={`filter-button ${airCon.includes(option) ? 'selected' : ''}`}
                  onClick={() => toggleSelection(airCon, setAirCon, option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="filter-row">
          <div className="filter-item">
            <label>Meal Plan</label>
            <div className="button-group">
              {['Yes', 'No'].map((option) => (
                <button
                  key={option}
                  className={`filter-button ${mealPlan.includes(option) ? 'selected' : ''}`}
                  onClick={() => toggleSelection(mealPlan, setMealPlan, option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-item">
            <label>Academic Programs</label>
            <div className="button-group">
              {['Yes(Compulsory)', 'Yes(Optional)', 'No'].map((option) => (
                <button
                  key={option}
                  className={`filter-button ${academicPrograms.includes(option) ? 'selected' : ''}`}
                  onClick={() => toggleSelection(academicPrograms, setAcademicPrograms, option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-item">
            <label>Hostel Activities</label>
            <div className="button-group">
              {['Yes(Compulsory)', 'Yes(Optional)'].map((option) => (
                <button
                  key={option}
                  className={`filter-button ${hostelActivities.includes(option) ? 'selected' : ''}`}
                  onClick={() => toggleSelection(hostelActivities, setHostelActivities, option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="price-row">
          <div className="filter-item">
            <label>Min Price: {minPrice}</label>
            <input
              type="range"
              min="0"
              max="2000"
              value={minPrice}
              onChange={(event) => setMinPrice(event.target.value)}
            />
          </div>
          <div className="filter-item">
            <label>Max Price: {maxPrice}</label>
            <input
              type="range"
              min="0"
              max="2000"
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
            />
          </div>
        </div>
        <div className="filter-item">
          <label>Min Rating: {minRating}</label>
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={minRating}
            onChange={(event) => setMinRating(event.target.value)}
          />
        </div>
        {errorMessage && <p>{errorMessage}</p>}
        <button className="apply-filter-button" onClick={onApplyFilter}>
          Apply Filter
        </button>
      </div>
    </div>
  );
};

export default Filter;
