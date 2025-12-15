import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';

const UpdateUser = () => {
  const { updateUser } = useContext(UserContext);
  const [name, setName] = useState('');

  const handleUpdate = () => {
    if (name.trim()) {
      updateUser({ name });
      setName('');
    }
  };

  return (
    <div style={styles.card}>
      <h2>Modifier l'Utilisateur</h2>
      <input
        type="text"
        placeholder="Nouveau nom"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleUpdate} style={styles.button}>
        Mettre à jour
      </button>
    </div>
  );
};

const styles = {
  card: {
    border: '2px solid #2196F3',
    borderRadius: '8px',
    padding: '20px',
    margin: '10px',
    backgroundColor: '#f9f9f9'
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    marginRight: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '200px'
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default UpdateUser;
