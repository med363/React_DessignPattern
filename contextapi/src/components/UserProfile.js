import React, { useContext } from 'react';
import { UserContext } from '../UserContext';

const UserProfile = () => {
  // 3. Utiliser le Context avec useContext
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
