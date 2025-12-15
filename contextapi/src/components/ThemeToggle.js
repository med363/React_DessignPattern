import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme, themeStyles } = useContext(ThemeContext);

  return (
    <div style={{
      ...styles.card,
      backgroundColor: themeStyles.backgroundColor,
      color: themeStyles.color,
      border: `2px solid ${theme === 'light' ? '#FF9800' : '#FFC107'}`
    }}>
      <h2>Contrôle du Thème</h2>
      <p>Thème actuel: <strong>{themeStyles.name}</strong></p>
      <button 
        onClick={toggleTheme} 
        style={{
          ...styles.button,
          backgroundColor: theme === 'light' ? '#FF9800' : '#FFC107',
          color: theme === 'light' ? 'white' : '#000'
        }}
      >
        🌓 Changer le thème
      </button>
    </div>
  );
};

const styles = {
  card: {
    borderRadius: '8px',
    padding: '20px',
    margin: '10px',
    transition: 'all 0.3s ease'
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'all 0.3s ease'
  }
};

export default ThemeToggle;
