import React from 'react';
import { UserProvider } from './UserContext';
import { ThemeProvider } from './ThemeContext';
import UserProfile from './components/UserProfile';
import UpdateUser from './components/UpdateUser';
import ThemeToggle from './components/ThemeToggle';
import ThemeDisplay from './components/ThemeDisplay';
import './App.css';

function App() {
  return (
    <div className="App">
      <header style={styles.header}>
        <h1>Context API - Multiple Contexts</h1>
        <p>Comprendre l'utilisation de plusieurs contexts en même temps</p>
      </header>
      
      {/* Imbriquer plusieurs Providers (Providers composition) */}
      <ThemeProvider>
        <UserProvider>
          <div style={styles.container}>
            <UserProfile />
            <UpdateUser />
            <ThemeToggle />
            <ThemeDisplay />
          </div>
        </UserProvider>
      </ThemeProvider>

      <footer style={styles.footer}>
        <h3>Concepts avancés :</h3>
        <ol style={styles.list}>
          <li><strong>Multiple Contexts</strong> - Plusieurs contexts dans une app</li>
          <li><strong>Providers Composition</strong> - Imbriquer les providers</li>
          <li><strong>useContext multiple</strong> - Utiliser plusieurs contexts dans un composant</li>
          <li><strong>Séparation des préoccupations</strong> - Chaque context gère sa propre logique</li>
          <li>Thème + User = 2 contexts indépendants 🎯</li>
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
