import useHostelSearch from '../hooks/useHostelSearch';
import { APPLY_BUTTON_TEXT, SEARCH_PLACEHOLDER } from '../constants/search';
import '../styles/search-bar.scss';

const SearchBar = ({ onSearch, isFilterApplied }) => {
  const { searchTerm, handleInputChange, handleSearch, handleInputKeyDown } = useHostelSearch(onSearch);

  return (
    <div className="hostel-search-bar">
      <input
        type="text"
        placeholder={SEARCH_PLACEHOLDER}
        className={`hostel-search-bar__input ${isFilterApplied ? 'disabled' : ''}`}
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        disabled={isFilterApplied}
      />
      <button
        type="button"
        className={`hostel-search-bar__apply ${isFilterApplied ? 'disabled' : ''}`}
        onClick={handleSearch}
        disabled={isFilterApplied}
      >
        {APPLY_BUTTON_TEXT}
      </button>
    </div>
  );
};

export default SearchBar;
