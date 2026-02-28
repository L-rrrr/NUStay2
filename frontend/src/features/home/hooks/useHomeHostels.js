import { useEffect, useState } from 'react';
import { useHostels } from '../../../contexts/HostelContext';

const useHomeHostels = ({ fromFilter }) => {
  const { hostels, filteredHostels, setFilteredHostels } = useHostels();
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [orderBy, setOrderBy] = useState(() => localStorage.getItem('orderBy') || 'rating');
  const [order, setOrder] = useState(() => localStorage.getItem('order') || 'high-to-low');

  const sortHostels = (data, sortField, sortOrder) => {
    const sortedData = [...data].sort((a, b) => {
      const valueA = sortField === 'price' ? a.price : a.averageRating;
      const valueB = sortField === 'price' ? b.price : b.averageRating;
      return sortOrder === 'high-to-low' ? valueB - valueA : valueA - valueB;
    });

    setFilteredHostels(sortedData);
  };

  useEffect(() => {
    if (!hostels.length) return;

    const storedFilteredHostels = localStorage.getItem('filteredHostels');

    if (fromFilter && storedFilteredHostels) {
      const parsedHostels = JSON.parse(storedFilteredHostels);
      setFilteredHostels(parsedHostels);
      setIsFilterApplied(true);
      sortHostels(parsedHostels, orderBy, order);
      return;
    }

    setFilteredHostels(hostels);
    setIsFilterApplied(false);
    localStorage.removeItem('filteredHostels');
    localStorage.removeItem('isFilterApplied');
    sortHostels(hostels, orderBy, order);
  }, [hostels, setFilteredHostels, fromFilter]);

  const handleOrderByChange = (field) => {
    setOrderBy(field);
    localStorage.setItem('orderBy', field);
    sortHostels(filteredHostels.length > 0 ? filteredHostels : hostels, field, order);
  };

  const handleOrderChange = (newOrder) => {
    setOrder(newOrder);
    localStorage.setItem('order', newOrder);
    sortHostels(filteredHostels.length > 0 ? filteredHostels : hostels, orderBy, newOrder);
  };

  const handleSearch = (searchTerm) => {
    const filteredData = hostels.filter((hostel) =>
      hostel.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const storedOrderBy = localStorage.getItem('orderBy');
    const storedOrder = localStorage.getItem('order');
    const sortField = storedOrderBy || 'rating';
    const sortOrder = storedOrder || 'high-to-low';

    const sortedFilteredData = [...filteredData].sort((a, b) => {
      const valueA = sortField === 'price' ? a.price : a.averageRating;
      const valueB = sortField === 'price' ? b.price : b.averageRating;
      return sortOrder === 'high-to-low' ? valueB - valueA : valueA - valueB;
    });

    setFilteredHostels(sortedFilteredData);
    localStorage.setItem('filteredHostels', JSON.stringify(sortedFilteredData));
    localStorage.setItem('isFilterApplied', 'true');
    setIsFilterApplied(true);
  };

  const handleCancelFilter = () => {
    setFilteredHostels(hostels);
    localStorage.removeItem('filteredHostels');
    localStorage.removeItem('isFilterApplied');
    setIsFilterApplied(false);
    sortHostels(hostels, orderBy, order);
  };

  return {
    filteredHostels,
    isFilterApplied,
    orderBy,
    order,
    handleSearch,
    handleOrderByChange,
    handleOrderChange,
    handleCancelFilter,
  };
};

export default useHomeHostels;
