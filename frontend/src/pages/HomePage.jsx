import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { Home, useHomeHostels } from '../features/home';

const HomePage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { currentUser, userLoggedIn } = useAuth();

	if (!userLoggedIn) {
		return <Navigate to="/login" replace />;
	}

	const {
		filteredHostels,
		isFilterApplied,
		orderBy,
		order,
		handleSearch,
		handleOrderByChange,
		handleOrderChange,
		handleCancelFilter,
	} = useHomeHostels({
		fromFilter: Boolean(location.state?.fromFilter),
	});

	return (
		<Home
			currentUser={currentUser}
			filteredHostels={filteredHostels}
			isFilterApplied={isFilterApplied}
			orderBy={orderBy}
			order={order}
			onSearch={handleSearch}
			onOrderByChange={handleOrderByChange}
			onOrderChange={handleOrderChange}
			onCancelFilter={handleCancelFilter}
			onOpenFilter={() => navigate('/filter', { state: { fromFilter: true } })}
		/>
	);
};

export default HomePage;
