import { useCallback, useState } from 'react';

const useHostelSearch = (onSearch) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleSearch = useCallback(() => {
    if (typeof onSearch === 'function') {
      onSearch(searchTerm.trim());
    }
  }, [onSearch, searchTerm]);

  const handleInputKeyDown = useCallback((event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  return {
    searchTerm,
    handleInputChange,
    handleSearch,
    handleInputKeyDown,
  };
};

export default useHostelSearch;
