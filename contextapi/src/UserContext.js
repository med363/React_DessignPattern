import React, { createContext, useState } from 'react';

// 1. Créer le Context
export const UserContext = createContext();

// 2. Créer le Provider (fournisseur de données)
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'Jean Dupont',
    age: 25,
    email: 'jean@example.com'
  });

  const updateUser = (newUser) => {
    setUser({ ...user, ...newUser });
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
