import React, { useState } from 'react';
import { CounterProvider } from './CounterContext';
import CounterDisplay from './components/CounterDisplay';
import CounterControls from './components/CounterControls';
import CounterStatus from './components/CounterStatus';
import './App.css';

function App() {
  const [showExplanation, setShowExplanation] = useState(true);

  return (
    <div className="App">
      <header style={styles.header}>
        <h1>🎯 Context API - Changement d'État Simple</h1>
        <p>Comprendre comment l'état se propage automatiquement</p>
        <button 
          onClick={() => setShowExplanation(!showExplanation)}
          style={styles.toggleBtn}
        >
          {showExplanation ? '🙈 Masquer' : '👁️ Afficher'} l'explication
        </button>
      </header>
      
      {/* 
        LE PROVIDER ENVELOPPE TOUT
        Il contient l'état (count) et les fonctions pour le modifier
      */}
      <CounterProvider>
        <div style={styles.container}>
          
          {/* Barre d'explication */}
          {showExplanation && (
            <div style={styles.explanation}>
              <h3>🔍 Comment ça fonctionne ?</h3>
              <ol style={styles.steps}>
                <li>
                  <strong>État initial:</strong> count = 0 dans le Provider
                </li>
                <li>
                  <strong>Affichage:</strong> Tous les composants lisent count via useCounter()
                </li>
                <li>
                  <strong>Clic sur un bouton:</strong> Une fonction (increment, etc.) est appelée
                </li>
                <li>
                  <strong>Changement d'état:</strong> setCount() met à jour count dans le Provider
                </li>
                <li>
                  <strong>Re-render automatique:</strong> TOUS les composants qui utilisent count se re-render
                </li>
                <li>
                  <strong>UI synchronisée:</strong> L'affichage est mis à jour partout en même temps!
                </li>
              </ol>
              <div style={styles.note}>
                💡 <strong>Astuce:</strong> Ouvrez la console (F12) pour voir les logs des changements d'état
              </div>
            </div>
          )}

          {/* Grille de composants */}
          <div style={styles.grid}>
            {/* 
              COMPOSANT 1: Affiche seulement
              Ne modifie jamais l'état
            */}
            <CounterDisplay />

            {/* 
              COMPOSANT 2: Modifie l'état
              Contient les boutons d'action
            */}
            <CounterControls />

            {/* 
              COMPOSANT 3: Affiche des valeurs dérivées
              Se met à jour automatiquement
            */}
            <CounterStatus />
          </div>

          {/* Section explicative */}
          <div style={styles.flow}>
            <h3>📊 Flux de données avec Context API</h3>
            <div style={styles.flowDiagram}>
              <div style={styles.flowStep}>
                <div style={styles.flowBox}>
                  🏪 Provider
                  <div style={styles.flowDetail}>
                    État: count = X
                  </div>
                </div>
              </div>
              
              <div style={styles.arrow}>⬇️</div>
              
              <div style={styles.flowStep}>
                <div style={styles.flowBoxGroup}>
                  <div style={styles.flowBox}>
                    📊 Display
                    <div style={styles.flowDetail}>lit count</div>
                  </div>
                  <div style={styles.flowBox}>
                    🎮 Controls
                    <div style={styles.flowDetail}>change count</div>
                  </div>
                  <div style={styles.flowBox}>
                    📈 Status
                    <div style={styles.flowDetail}>lit count</div>
                  </div>
                </div>
              </div>
              
              <div style={styles.arrow}>⬆️</div>
              
              <div style={styles.flowStep}>
                <div style={styles.flowBox}>
                  🔄 Mise à jour
                  <div style={styles.flowDetail}>
                    Quand count change, tous se re-render
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Points clés */}
          <div style={styles.keyPoints}>
            <h3>✨ Points Clés du Changement d'État</h3>
            <div style={styles.pointsGrid}>
              <div style={styles.point}>
                <div style={styles.pointIcon}>1️⃣</div>
                <div style={styles.pointTitle}>État centralisé</div>
                <div style={styles.pointText}>
                  L'état vit dans le Provider, pas dans les composants individuels
                </div>
              </div>

              <div style={styles.point}>
                <div style={styles.pointIcon}>2️⃣</div>
                <div style={styles.pointTitle}>Modification via fonctions</div>
                <div style={styles.pointText}>
                  Les composants appellent des fonctions (increment, etc.) pour changer l'état
                </div>
              </div>

              <div style={styles.point}>
                <div style={styles.pointIcon}>3️⃣</div>
                <div style={styles.pointTitle}>Re-render automatique</div>
                <div style={styles.pointText}>
                  Quand l'état change, React re-render automatiquement tous les composants concernés
                </div>
              </div>

              <div style={styles.point}>
                <div style={styles.pointIcon}>4️⃣</div>
                <div style={styles.pointTitle}>Pas de props</div>
                <div style={styles.pointText}>
                  Aucun composant ne reçoit de props! Tout passe par le Context
                </div>
              </div>

              <div style={styles.point}>
                <div style={styles.pointIcon}>5️⃣</div>
                <div style={styles.pointTitle}>Synchronisation</div>
                <div style={styles.pointText}>
                  Tous les composants affichent toujours la même valeur, en temps réel
                </div>
              </div>

              <div style={styles.point}>
                <div style={styles.pointIcon}>6️⃣</div>
                <div style={styles.pointTitle}>Une source de vérité</div>
                <div style={styles.pointText}>
                  Le Provider est la "single source of truth" pour l'état count
                </div>
              </div>
            </div>
          </div>
        </div>
      </CounterProvider>
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
  toggleBtn: {
    marginTop: '15px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  container: {
    padding: '20px',
    maxWidth: '1400px',
    margin: '0 auto'
  },
  explanation: {
    backgroundColor: '#fff3cd',
    border: '3px solid #ffc107',
    borderRadius: '12px',
    padding: '25px',
    marginBottom: '30px'
  },
  steps: {
    textAlign: 'left',
    lineHeight: '2',
    fontSize: '16px'
  },
  note: {
    backgroundColor: '#d1ecf1',
    border: '2px solid #0c5460',
    padding: '15px',
    borderRadius: '6px',
    marginTop: '20px',
    color: '#0c5460'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  flow: {
    backgroundColor: '#f8f9fa',
    padding: '30px',
    borderRadius: '12px',
    marginBottom: '30px',
    border: '2px solid #dee2e6'
  },
  flowDiagram: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    marginTop: '20px'
  },
  flowStep: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  flowBox: {
    backgroundColor: 'white',
    border: '3px solid #2196F3',
    borderRadius: '8px',
    padding: '20px',
    fontSize: '18px',
    fontWeight: 'bold',
    textAlign: 'center',
    minWidth: '200px'
  },
  flowBoxGroup: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  flowDetail: {
    fontSize: '14px',
    fontWeight: 'normal',
    color: '#666',
    marginTop: '8px'
  },
  arrow: {
    fontSize: '32px'
  },
  keyPoints: {
    backgroundColor: '#e8f5e9',
    padding: '30px',
    borderRadius: '12px',
    border: '3px solid #4CAF50'
  },
  pointsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    marginTop: '20px'
  },
  point: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    border: '2px solid #ddd'
  },
  pointIcon: {
    fontSize: '32px',
    marginBottom: '10px'
  },
  pointTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333'
  },
  pointText: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.6'
  }
};

export default App;
