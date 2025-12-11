import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { UserContext } from '../UserContext';

/**
 * COMPOSANT: ThemeDisplay
 * 
 * DÉMONTRE: L'utilisation de MULTIPLES CONTEXTS dans un seul composant
 * 
 * Ce composant consomme 2 Contexts différents:
 * - ThemeContext (pour les styles du thème)
 * - UserContext (pour les infos utilisateur)
 * 
 * C'est totalement possible et même encouragé!
 * Chaque Context gère sa propre logique indépendamment
 */
const ThemeDisplay = () => {
  /**
   * CONSOMMER PLUSIEURS CONTEXTS
   * 
   * On peut utiliser useContext() plusieurs fois dans un composant
   * Chaque appel accède à un Context différent
   * 
   * Important: Les Contexts doivent être fournis par leurs Providers respectifs
   * dans l'arbre des composants parents
   */
  const { themeStyles } = useContext(ThemeContext);  // Context 1: Thème
  const { user } = useContext(UserContext);           // Context 2: User

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
