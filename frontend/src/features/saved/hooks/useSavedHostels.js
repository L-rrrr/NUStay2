import { useEffect, useState } from 'react';
import { useHostels } from '../../../contexts/HostelContext';

const useSavedHostels = ({ userId }) => {
  const { hostels } = useHostels();
  const [savedHostels, setSavedHostels] = useState([]);

  useEffect(() => {
    if (!userId) {
      setSavedHostels([]);
      return;
    }

    const userSavedHostels = hostels.filter((hostel) => hostel.savedBy.includes(userId));
    setSavedHostels(userSavedHostels);
  }, [hostels, userId]);

  return {
    savedHostels,
  };
};

export default useSavedHostels;
