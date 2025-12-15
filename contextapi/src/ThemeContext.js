import React, { createContext, useState } from 'react';

/**
 * THEME CONTEXT - Gestion du thème de l'application
 * 
 * Ce Context permet de partager le thème (light/dark) à travers l'app
 * Démontre comment gérer des préférences UI avec Context API
 */
export const ThemeContext = createContext();

/**
 * THEME PROVIDER
 * Gère le thème actuel et fournit les styles correspondants
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Composants enfants
 */
export const ThemeProvider = ({ children }) => {
  // État: thème actuel ('light' ou 'dark')
  const [theme, setTheme] = useState('light');

  /**
   * Fonction pour basculer entre light et dark
   * Utilise l'opérateur ternaire pour inverser
   */
  const toggleTheme = () => {
    // prevTheme garantit qu'on utilise la dernière valeur
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  /**
   * Configuration des styles pour chaque thème
   * Stocké dans un objet pour faciliter l'accès
   */
  const themeStyles = {
    light: {
      backgroundColor: '#ffffff',
      color: '#000000',
      name: 'Clair'
    },
    dark: {
      backgroundColor: '#1a1a1a',
      color: '#ffffff',
      name: 'Sombre'
    }
  };

  /**
   * La valeur fournie contient:
   * - theme: 'light' ou 'dark'
   * - toggleTheme: fonction pour changer
   * - themeStyles: styles du thème actuel (themeStyles[theme])
   */
  return (
    <ThemeContext.Provider value={{ 
      theme, 
      toggleTheme, 
      themeStyles: themeStyles[theme]  // On fournit seulement le thème actif
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
