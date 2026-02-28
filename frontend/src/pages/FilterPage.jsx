import { useNavigate } from 'react-router-dom';
import { Filter, useHostelFilters } from '../features/filter';

const FilterPage = () => {
	const navigate = useNavigate();
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
	} = useHostelFilters({
		onApplyFilters: () => navigate('/home', { state: { fromFilter: true } }),
	});

	return (
		<Filter
			propertyType={propertyType}
			roomType={roomType}
			minPrice={minPrice}
			maxPrice={maxPrice}
			minRating={minRating}
			mealPlan={mealPlan}
			academicPrograms={academicPrograms}
			hostelActivities={hostelActivities}
			airCon={airCon}
			errorMessage={errorMessage}
			setPropertyType={setPropertyType}
			setRoomType={setRoomType}
			setMinPrice={setMinPrice}
			setMaxPrice={setMaxPrice}
			setMinRating={setMinRating}
			setMealPlan={setMealPlan}
			setAcademicPrograms={setAcademicPrograms}
			setHostelActivities={setHostelActivities}
			setAirCon={setAirCon}
			toggleSelection={toggleSelection}
			onApplyFilter={handleApplyFilter}
		/>
	);
};

export default FilterPage;
