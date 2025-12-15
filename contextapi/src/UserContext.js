import React, { createContext, useState } from 'react';

/**
 * USER CONTEXT - Gestion des données utilisateur
 * 
 * ÉTAPE 1: Créer le Context
 * createContext() retourne un objet avec deux composants:
 * - Provider: fournit les données
 * - Consumer: consomme les données (rarement utilisé, on préfère useContext)
 */
export const UserContext = createContext();

/**
 * ÉTAPE 2: Créer le Provider Component
 * 
 * Ce Provider gère l'état de l'utilisateur connecté
 * Il fournit les données et les fonctions pour les modifier
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Les composants enfants
 */
export const UserProvider = ({ children }) => {
  // État: informations de l'utilisateur
  const [user, setUser] = useState({
    name: 'Jean Dupont',
    age: 25,
    email: 'jean@example.com'
  });

  /**
   * Fonction pour mettre à jour les informations utilisateur
   * Utilise le spread operator pour merger les données
   * @param {Object} newUser - Nouvelles données (partielles ou complètes)
   */
  const updateUser = (newUser) => {
    // Spread l'ancien user et override avec les nouvelles valeurs
    setUser({ ...user, ...newUser });
  };

  // Retourne le Provider avec la valeur (user + updateUser)
  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
