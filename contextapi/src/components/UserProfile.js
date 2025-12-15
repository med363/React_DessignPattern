import React, { useContext } from 'react';
import { UserContext } from '../UserContext';

/**
 * COMPOSANT: UserProfile
 * Affiche les informations de l'utilisateur
 * 
 * MÉTHODE 1: Utiliser useContext directement
 * (Alternative: créer un hook personnalisé comme useShoppingCart)
 */
const UserProfile = () => {
  /**
   * CONSOMMER LE CONTEXT avec useContext
   * 
   * useContext(UserContext) retourne la valeur fournie par UserProvider
   * Dans ce cas: { user, updateUser }
   * On destructure pour prendre seulement 'user'
   */
  const { user } = useContext(UserContext);

  return (
    <div style={styles.card}>
      <h2>Profil Utilisateur</h2>
      <p><strong>Nom:</strong> {user.name}</p>
      <p><strong>Âge:</strong> {user.age}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

const styles = {
  card: {
    border: '2px solid #4CAF50',
    borderRadius: '8px',
    padding: '20px',
    margin: '10px',
    backgroundColor: '#f9f9f9'
  }
};

export default UserProfile;
