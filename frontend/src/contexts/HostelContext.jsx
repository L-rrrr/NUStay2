import { createContext, useState, useContext, useEffect } from 'react';
import apiRequest from '../lib/apiRequest';

const HostelContext = createContext();

export const HostelProvider = ({ children }) => {
  const [hostels, setHostels] = useState([]);
  const [filteredHostels, setFilteredHostels] = useState([]);

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const response = await apiRequest.get('/hostels');
        const data = response.data;
        data.sort((a, b) => b.averageRating - a.averageRating);
        setHostels(data);
        setFilteredHostels(data);
      } catch (error) {
        console.error('Error fetching hostels:', error);
      }
    };

    fetchHostels();
  }, []);

  const saveHostel = async (hostelId, userId) => {
    try {
      await apiRequest.post(`/hostels/save/${hostelId}`, { userId });
      setHostels((prevHostels) =>
        prevHostels.map((hostel) =>
          hostel._id === hostelId
            ? {
                ...hostel,
                savedBy: hostel.savedBy.includes(userId)
                  ? hostel.savedBy.filter((id) => id !== userId)
                  : [...hostel.savedBy, userId],
              }
            : hostel
        )
      );
      setFilteredHostels((prevHostels) =>
        prevHostels.map((hostel) =>
          hostel._id === hostelId
            ? {
                ...hostel,
                savedBy: hostel.savedBy.includes(userId)
                  ? hostel.savedBy.filter((id) => id !== userId)
                  : [...hostel.savedBy, userId],
              }
            : hostel
        )
      );
    } catch (error) {
      console.error('Error saving hostel:', error);
    }
  };

  return (
    <HostelContext.Provider value={{ hostels, setHostels, filteredHostels, setFilteredHostels, saveHostel }}>
      {children}
    </HostelContext.Provider>
  );
};

export const useHostels = () => useContext(HostelContext);
