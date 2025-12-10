import React from 'react';
import { UserProvider } from './UserContext';
import UserProfile from './components/UserProfile';
import UpdateUser from './components/UpdateUser';
import './App.css';

function App() {
  return (
    <div className="App">
      <header style={styles.header}>
        <h1>Context API - Exemple Simple</h1>
        <p>Comprendre le partage de données avec Context API</p>
      </header>
      
      {/* 4. Envelopper les composants avec le Provider */}
      <UserProvider>
        <div style={styles.container}>
          <UserProfile />
          <UpdateUser />
        </div>
      </UserProvider>

      <footer style={styles.footer}>
        <h3>Comment ça marche ?</h3>
        <ol style={styles.list}>
          <li><strong>createContext()</strong> - Crée un Context</li>
          <li><strong>Provider</strong> - Fournit les données aux composants enfants</li>
          <li><strong>useContext()</strong> - Consomme les données du Context</li>
          <li>Les données sont partagées sans props drilling ✨</li>
        </ol>
      </footer>
    </div>
  );
}

const styles = {
  header: {
    backgroundColor: '#282c34',
    padding: '20px',
    color: 'white',
    textAlign: 'center'
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: '20px',
    minHeight: '300px'
  },
  footer: {
    backgroundColor: '#f0f0f0',
    padding: '20px',
    marginTop: '20px',
    textAlign: 'left',
    maxWidth: '600px',
    margin: '20px auto',
    borderRadius: '8px'
  },
  list: {
    textAlign: 'left',
    lineHeight: '1.8'
  }
};

export default App;
