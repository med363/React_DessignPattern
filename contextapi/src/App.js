import React, { useState } from 'react';
import { DisplaySettingsProvider } from './DisplaySettingsContext';
import SettingsPanel from './components/SettingsPanel';
import ContentDisplay from './components/ContentDisplay';
import './App.css';

function App() {
  const [showExplanation, setShowExplanation] = useState(true);

  return (
    <div className="App">
      <header style={styles.header}>
        <h1>⚙️ Context API - Gestion des Paramètres d'Affichage</h1>
        <p>Comprendre comment gérer et synchroniser plusieurs paramètres avec Context API</p>
        <button 
          onClick={() => setShowExplanation(!showExplanation)}
          style={styles.toggleBtn}
        >
          {showExplanation ? '🙈 Masquer' : '👁️ Afficher'} l'explication
        </button>
      </header>
      
      {/* 
        ═══════════════════════════════════════════════════════════════════════════
        DISPLAY SETTINGS PROVIDER - GESTION DES PARAMÈTRES
        ═══════════════════════════════════════════════════════════════════════════
        
        Ce Provider gère PLUSIEURS paramètres d'affichage:
        1. fontSize (taille du texte: small/medium/large)
        2. themeColor (couleur: blue/green/purple/orange)
        3. displayMode (affichage: grid/list)
        4. showImages (afficher images: true/false)
        5. showDescriptions (afficher descriptions: true/false)
        6. language (langue: fr/en/es)
        
        DIFFÉRENCE AVEC CounterContext:
        - Counter: UN SEUL état simple (number)
        - DisplaySettings: PLUSIEURS états différents (string, boolean)
        
        FLUX DES PARAMÈTRES:
        ┌─────────────────────────────────────────────────────────────────────┐
        │ 1. User change un paramètre dans SettingsPanel                     │
        │ 2. Un setter est appelé (ex: setFontSize('large'))                 │
        │ 3. Le Provider met à jour son état                                 │
        │ 4. React détecte le changement                                     │
        │ 5. ContentDisplay se re-render avec le nouveau paramètre           │
        │ 6. L'UI applique les nouveaux styles automatiquement!              │
        └─────────────────────────────────────────────────────────────────────┘
        
        AVANTAGES:
        ✅ Centralisation: Un seul endroit pour tous les paramètres
        ✅ Synchronisation: Tous les composants utilisent les mêmes valeurs
        ✅ Simplicité: Pas de props drilling
        ✅ Réutilisabilité: N'importe quel composant peut lire/modifier
      */}
      <DisplaySettingsProvider>
        <div style={styles.container}>
          
          {/* Barre d'explication */}
          {showExplanation && (
            <div style={styles.explanation}>
              <h3>🔍 Comment gérer les paramètres avec Context API ?</h3>
              <ol style={styles.steps}>
                <li>
                  <strong>États multiples:</strong> Le Provider gère 6 paramètres différents simultanément
                </li>
                <li>
                  <strong>Panneau de contrôle:</strong> SettingsPanel permet de modifier tous les paramètres
                </li>
                <li>
                  <strong>Changement:</strong> Quand vous cliquez, un setter change l'état (ex: setFontSize)
                </li>
                <li>
                  <strong>Propagation:</strong> Le Provider se met à jour avec la nouvelle valeur
                </li>
                <li>
                  <strong>Synchronisation:</strong> ContentDisplay se re-render automatiquement
                </li>
                <li>
                  <strong>Application:</strong> Les nouveaux styles sont appliqués partout!
                </li>
              </ol>
              <div style={styles.note}>
                💡 <strong>Astuce:</strong> Ouvrez la console (F12) pour voir les logs des changements
                <br /><br />
                <strong>Ce que vous verrez:</strong>
                <br />📏 <code>Changement de taille: medium → large</code>
                <br />🔄 <code>ContentDisplay re-rendered avec: fontSize: 'large'</code>
                <br /><br />
                <strong>Testez:</strong> Changez plusieurs paramètres et voyez comment tout se synchronise!
              </div>
            </div>
          )}

          {/* Grille de composants */}
          <div style={styles.grid}>
            {/* 
              PANNEAU DE PARAMÈTRES
              Permet de modifier tous les paramètres d'affichage
            */}
            <SettingsPanel />

            {/* 
              AFFICHAGE DU CONTENU
              Applique les paramètres et se met à jour automatiquement
            */}
            <ContentDisplay />
          </div>
        </div>
      </DisplaySettingsProvider>
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
