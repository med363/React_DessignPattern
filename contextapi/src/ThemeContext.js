import React, { createContext, useState } from 'react';

// Créer un nouveau Context pour le thème
export const ThemeContext = createContext();

// Provider pour gérer le thème de l'application
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

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

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      toggleTheme, 
      themeStyles: themeStyles[theme] 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
