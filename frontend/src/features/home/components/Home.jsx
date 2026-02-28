import { List, Map, SearchBar } from '../../hostels';
import './home.css';

const Home = ({
  currentUser,
  filteredHostels,
  isFilterApplied,
  orderBy,
  order,
  onSearch,
  onOpenFilter,
  onCancelFilter,
  onOrderByChange,
  onOrderChange,
}) => {

  return (
    <div className="home-page">
      <header className="header">
        <h1>NUStay</h1>
      </header>

      <div className="search-bar-container">
        <SearchBar onSearch={onSearch} isFilterApplied={isFilterApplied} />
        <button className="filter-button profile" onClick={onOpenFilter}>
          Filter
        </button>
        {isFilterApplied && (
          <button className="cancel-filter-button profile" onClick={onCancelFilter}>
            Cancel
          </button>
        )}
      </div>

      <div className="sort-container">
        <div className="sort-group">
          <label>Order By:</label>
          <button className={`sort-button ${orderBy === 'price' ? 'selected' : ''}`} onClick={() => onOrderByChange('price')}>Price</button>
          <button className={`sort-button ${orderBy === 'rating' ? 'selected' : ''}`} onClick={() => onOrderByChange('rating')}>Rating</button>
        </div>
        <div className="sort-group">
          <label>Order:</label>
          <button className={`sort-button ${order === 'high-to-low' ? 'selected' : ''}`} onClick={() => onOrderChange('high-to-low')}>High to Low</button>
          <button className={`sort-button ${order === 'low-to-high' ? 'selected' : ''}`} onClick={() => onOrderChange('low-to-high')}>Low to High</button>
        </div>
      </div>

      <div className="main-content">
        <div className="hostel-list-section">
          <h2>Top rated hostels in NUS</h2>
          <List posts={filteredHostels} />
        </div>
        <div className="map-explore-section">
          <h2>Map (click on pin to view hostel info)</h2>
          <div className="home-map-container">
            <Map items={filteredHostels} />
          </div>
        </div>
      </div>
      <div className="login-info">
        Hello {currentUser.displayName ? currentUser.displayName : currentUser.email}, you are now logged in.
      </div>
    </div>
  );
};

export default Home;
