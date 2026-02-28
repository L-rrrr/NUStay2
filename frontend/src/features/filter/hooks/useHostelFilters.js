import { useState } from 'react';
import { useHostels } from '../../../contexts/HostelContext';

const useHostelFilters = ({ onApplyFilters }) => {
  const { hostels, setFilteredHostels } = useHostels();
  const [propertyType, setPropertyType] = useState([]);
  const [roomType, setRoomType] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [minRating, setMinRating] = useState(0);
  const [mealPlan, setMealPlan] = useState([]);
  const [academicPrograms, setAcademicPrograms] = useState([]);
  const [hostelActivities, setHostelActivities] = useState([]);
  const [airCon, setAirCon] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const toggleSelection = (state, setState, value) => {
    setState((prevState) =>
      prevState.includes(value)
        ? prevState.filter((item) => item !== value)
        : [...prevState, value]
    );
  };

  const setFilter = (filters) => {
    const {
      propertyType,
      roomType,
      minPrice,
      maxPrice,
      minRating,
      mealPlan,
      academicPrograms,
      hostelActivities,
      airCon,
    } = filters;

    const filteredData = hostels.filter((hostel) => {
      const matchesPropertyType =
        propertyType.length === 0 || propertyType.some((mainType) => hostel.type.includes(mainType));
      const matchesRoomType =
        roomType.length === 0 || roomType.some((subType) => hostel.type.includes(subType));
      const matchesMinPrice = minPrice === '' || hostel.price >= parseFloat(minPrice);
      const matchesMaxPrice = maxPrice === '' || hostel.price <= parseFloat(maxPrice);
      const matchesMinRating = hostel.averageRating >= parseFloat(minRating);
      const matchesMealPlan = mealPlan.length === 0 || mealPlan.some((plan) => hostel.mealPlan.includes(plan));
      const matchesAcademicPrograms =
        academicPrograms.length === 0 || academicPrograms.includes(hostel.academicProgrammes);
      const matchesHostelActivities =
        hostelActivities.length === 0 || hostelActivities.includes(hostel.hostelActivities);
      const matchesAirCon = airCon.length === 0 || airCon.some((subType) => hostel.type.includes(subType));

      return (
        matchesPropertyType &&
        matchesRoomType &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesMinRating &&
        matchesMealPlan &&
        matchesAcademicPrograms &&
        matchesHostelActivities &&
        matchesAirCon
      );
    });

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
    onApplyFilters?.();
  };

  const handleApplyFilter = () => {
    if (parseFloat(minPrice) > parseFloat(maxPrice)) {
      setErrorMessage('Min price must be smaller than max price!');
      return;
    }

    setErrorMessage('');

    setFilter({
      propertyType,
      roomType,
      minPrice,
      maxPrice,
      minRating,
      mealPlan,
      academicPrograms,
      hostelActivities,
      airCon,
    });
  };

  return {
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
    handleApplyFilter,
  };
};

export default useHostelFilters;
