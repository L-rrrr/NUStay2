import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { HostelInfo, useHostelDetail } from '../features/hostelInfo';

const HostelInfoPage = () => {
	const { id } = useParams();
	const { currentUser } = useAuth();
	const { hostel, isSaved, isSaving, saveError, handleSave } = useHostelDetail({
		hostelId: id,
		userId: currentUser?.uid,
	});

	if (!id) {
		return <div>Invalid hostel id.</div>;
	}

	if (!hostel) {
		return <div>Loading...</div>;
	}

	return (
		<HostelInfo
			hostel={hostel}
			hostelId={id}
			isSaved={isSaved}
			isSaving={isSaving}
			saveError={saveError}
			onSave={handleSave}
		/>
	);
};

export default HostelInfoPage;
