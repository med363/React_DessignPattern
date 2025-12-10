import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { UserContext } from '../UserContext';

const ThemeDisplay = () => {
  // Utiliser DEUX contexts différents dans le même composant !
  const { themeStyles } = useContext(ThemeContext);
  const { user } = useContext(UserContext);

  return (
    <div style={{
      ...styles.card,
      backgroundColor: themeStyles.backgroundColor,
      color: themeStyles.color,
      border: `2px solid ${themeStyles.color}`
    }}>
      <h2>Composant Multi-Context</h2>
      <p>👤 Utilisateur: <strong>{user.name}</strong></p>
      <p>🎨 Thème: <strong>{themeStyles.name}</strong></p>
      <p style={styles.info}>
        ✨ Ce composant utilise 2 contexts en même temps !
      </p>
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
  info: {
    fontSize: '14px',
    fontStyle: 'italic',
    marginTop: '10px'
  }
};

export default ThemeDisplay;
