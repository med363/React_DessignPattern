import React from 'react';
import { useCounter } from '../CounterContext';

/**
 * COMPOSANT 2: CounterControls
 * 
 * Contient les boutons pour MODIFIER l'état
 * 
 * IMPORTANT: Quand on clique sur un bouton:
 * 1. La fonction (increment, decrement, etc.) est appelée
 * 2. Le Provider met à jour son état (setCount)
 * 3. TOUS les composants qui utilisent useCounter() se re-render
 *    (CounterDisplay, CounterStatus, etc.)
 */
const CounterControls = () => {
  // Récupérer toutes les fonctions de modification
  const { increment, decrement, reset, incrementBy, double } = useCounter();

  return (
    <div style={styles.card}>
      <h2>🎮 Contrôles</h2>
      
      <div style={styles.section}>
        <h3>Actions basiques</h3>
        <div style={styles.buttonGroup}>
          <button 
            onClick={increment} 
            style={{...styles.button, backgroundColor: '#4CAF50'}}
          >
            ➕ +1
          </button>
          
          <button 
            onClick={decrement} 
            style={{...styles.button, backgroundColor: '#f44336'}}
          >
            ➖ -1
          </button>
          
          <button 
            onClick={reset} 
            style={{...styles.button, backgroundColor: '#9E9E9E'}}
          >
            🔄 Reset
          </button>
        </div>
      </div>

      <div style={styles.section}>
        <h3>Actions avancées</h3>
        <div style={styles.buttonGroup}>
          <button 
            onClick={() => incrementBy(5)} 
            style={{...styles.button, backgroundColor: '#FF9800'}}
          >
            ⬆️ +5
          </button>
          
          <button 
            onClick={() => incrementBy(10)} 
            style={{...styles.button, backgroundColor: '#FF5722'}}
          >
            ⬆️⬆️ +10
          </button>
          
          <button 
            onClick={double} 
            style={{...styles.button, backgroundColor: '#9C27B0'}}
          >
            ✖️ x2
          </button>
        </div>
      </div>

      <p style={styles.info}>
        ⚡ Chaque clic change l'état dans le Provider
        <br />
        📡 Tous les composants reçoivent la mise à jour
      </p>
    </div>
  );
};

const styles = {
  card: {
    border: '3px solid #4CAF50',
    borderRadius: '12px',
    padding: '20px',
    margin: '10px',
    backgroundColor: '#f1f8f4'
  },
  section: {
    marginBottom: '20px'
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '10px'
  },
  button: {
    padding: '12px 20px',
    fontSize: '16px',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'transform 0.1s',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
  },
  info: {
    fontSize: '13px',
    color: '#666',
    fontStyle: 'italic',
    marginTop: '15px',
    textAlign: 'center'
  }
};

export default CounterControls;
