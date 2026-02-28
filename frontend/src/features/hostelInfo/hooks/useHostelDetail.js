import { useEffect, useMemo, useState } from 'react';
import { useHostels } from '../../../contexts/HostelContext';

const useHostelDetail = ({ hostelId, userId }) => {
  const { hostels, saveHostel } = useHostels();
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const hostel = useMemo(
    () => hostels.find((currentHostel) => currentHostel._id === hostelId) ?? null,
    [hostels, hostelId],
  );

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!hostel || !userId) {
      setIsSaved(false);
      return;
    }

    setIsSaved(hostel.savedBy.includes(userId));
  }, [hostel, userId]);

  const handleSave = async () => {
    if (!userId || !hostelId || isSaving) return;

    setIsSaving(true);
    setSaveError('');

    try {
      await saveHostel(hostelId, userId);
      setIsSaved((previousState) => !previousState);
    } catch (error) {
      setSaveError('Unable to save hostel. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return {
    hostel,
    isSaved,
    isSaving,
    saveError,
    handleSave,
  };
};

export default useHostelDetail;
