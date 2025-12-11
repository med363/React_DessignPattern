import React from 'react';
import { UserProvider } from './UserContext';
import { ThemeProvider } from './ThemeContext';
import { ShoppingCartProvider } from './ShoppingCartContext';
import UserProfile from './components/UserProfile';
import UpdateUser from './components/UpdateUser';
import ThemeToggle from './components/ThemeToggle';
import ThemeDisplay from './components/ThemeDisplay';
import ProductList from './components/ProductList';
import CartSummary from './components/CartSummary';
import CartStats from './components/CartStats';
import './App.css';

function App() {
  return (
    <div className="App">
      <header style={styles.header}>
        <h1>🎯 Context API - Provider Pattern</h1>
        <p>Comprendre le rôle du Provider en profondeur</p>
      </header>
      
      {/* 
        COMPOSITION DE PROVIDERS
        Chaque Provider enveloppe ses enfants et leur fournit des données
        L'ordre n'a pas d'importance car ils sont indépendants
      */}
      <ThemeProvider>
        <UserProvider>
          <ShoppingCartProvider>
            
            {/* Bouton panier flottant - disponible partout */}
            <CartSummary />

            <div style={styles.container}>
              
              {/* Section 1: User & Theme Context */}
              <section style={styles.section}>
                <h2>👤 Section Utilisateur & Thème</h2>
                <div style={styles.row}>
                  <UserProfile />
                  <UpdateUser />
                  <ThemeToggle />
                  <ThemeDisplay />
                </div>
              </section>

              {/* Section 2: Shopping Cart Context */}
              <section style={styles.section}>
                <h2>🛒 Section E-Commerce</h2>
                <ProductList />
                <CartStats />
              </section>

              {/* Explication */}
              <section style={styles.explanation}>
                <h3>🔍 Comment le Provider fonctionne :</h3>
                <div style={styles.grid}>
                  <div style={styles.card}>
                    <h4>1️⃣ Création</h4>
                    <p>Le Provider est un composant qui enveloppe d'autres composants</p>
                    <code style={styles.code}>
                      {'<Provider value={data}>{children}</Provider>'}
                    </code>
                  </div>
                  
                  <div style={styles.card}>
                    <h4>2️⃣ Value Prop</h4>
                    <p>La prop <strong>value</strong> contient toutes les données et fonctions à partager</p>
                    <code style={styles.code}>
                      {'{items, addItem, removeItem, ...}'}
                    </code>
                  </div>
                  
                  <div style={styles.card}>
                    <h4>3️⃣ Children</h4>
                    <p>Tous les composants enfants ont accès aux données via useContext</p>
                    <code style={styles.code}>
                      {'const {data} = useContext(Context)'}
                    </code>
                  </div>
                  
                  <div style={styles.card}>
                    <h4>4️⃣ Pas de Props Drilling</h4>
                    <p>Les données ne passent pas par les props intermédiaires !</p>
                    <code style={styles.code}>
                      {'❌ Parent → Child → GrandChild'}
                      <br />
                      {'✅ Provider → GrandChild'}
                    </code>
                  </div>
                  
                  <div style={styles.card}>
                    <h4>5️⃣ Re-render</h4>
                    <p>Quand value change, tous les composants qui utilisent le context se re-render</p>
                    <code style={styles.code}>
                      {'useState → setValue → re-render'}
                    </code>
                  </div>
                  
                  <div style={styles.card}>
                    <h4>6️⃣ Composition</h4>
                    <p>On peut imbriquer plusieurs Providers pour gérer différents états</p>
                    <code style={styles.code}>
                      {'<Theme><User><Cart>...</Cart></User></Theme>'}
                    </code>
                  </div>
                </div>
              </section>
            </div>
          </ShoppingCartProvider>
        </UserProvider>
      </ThemeProvider>
    </div>
  );
}

const styles = {
  header: {
    backgroundColor: '#282c34',
    padding: '30px',
    color: 'white',
    textAlign: 'center'
  },
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  section: {
    marginBottom: '40px',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '12px'
  },
  row: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '15px',
    marginTop: '20px'
  },
  explanation: {
    marginTop: '40px',
    padding: '30px',
    backgroundColor: '#fff3cd',
    borderRadius: '12px',
    border: '2px solid #ffc107'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    marginTop: '20px'
  },
  card: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    border: '2px solid #ddd'
  },
  code: {
    display: 'block',
    backgroundColor: '#f4f4f4',
    padding: '10px',
    borderRadius: '4px',
    fontSize: '12px',
    marginTop: '10px',
    fontFamily: 'monospace',
    whiteSpace: 'pre-wrap'
  }
};

export default App;
