import React, { createContext, useState, useContext } from 'react';

const HostelContext = createContext();

export const HostelProvider = ({ children }) => {
  const [hostels, setHostels] = useState([]);
  const [filteredHostels, setFilteredHostels] = useState([]);

  return (
    <HostelContext.Provider value={{ hostels, setHostels, filteredHostels, setFilteredHostels }}>
      {children}
    </HostelContext.Provider>
  );
};

export const useHostels = () => useContext(HostelContext);