import React from 'react';

export const loader = React.createContext({
    isLoading: false,
    fetchData: () => {},
  });