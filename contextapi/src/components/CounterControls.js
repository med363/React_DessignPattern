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
  /**
   * RÉCUPÉRATION DES FONCTIONS DE MODIFICATION
   * 
   * Ces fonctions viennent du Provider et permettent de CHANGER l'état
   * 
   * Chaque fonction:
   * 1. Est définie dans CounterProvider
   * 2. Appelle setCount() pour changer l'état
   * 3. Déclenche un re-render de TOUS les composants abonnés
   * 
   * IMPORTANT: On ne récupère PAS 'count' ici car ce composant
   * n'a pas besoin de LIRE la valeur, juste de la MODIFIER
   * 
   * Cela évite un re-render inutile de ce composant!
   */
  const { increment, decrement, reset, incrementBy, double } = useCounter();

  return (
    <div style={styles.card}>
      <h2>🎮 Contrôles</h2>
      
      <div style={styles.section}>
        <h3>Actions basiques</h3>
        <div style={styles.buttonGroup}>
          {/* 
            BOUTON INCREMENT
            ════════════════════════════════════════════════════════
            onClick={increment} → Appelle la fonction increment()
            
            Flux d'exécution quand on clique:
            1. [Clic] → onClick détecté
            2. [Function] → increment() est appelée
            3. [Provider] → setCount(count + 1) s'exécute
            4. [React] → Détecte que l'état a changé
            5. [Re-render] → Tous les composants avec useCounter() se mettent à jour
            6. [UI] → L'affichage change partout automatiquement!
            
            Regardez la console pour voir les logs!
          */}
          <button 
            onClick={increment} 
            style={{...styles.button, backgroundColor: '#4CAF50'}}
          >
            ➕ +1
          </button>
          
          {/* BOUTON DECREMENT - Même principe mais avec count - 1 */}
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
          {/* 
            FONCTIONS AVEC PARAMÈTRES
            ════════════════════════════════════════════════════════
            onClick={() => incrementBy(5)} → Fonction fléchée nécessaire!
            
            POURQUOI une arrow function?
            ❌ onClick={incrementBy(5)} → ERREUR! S'exécute immédiatement
            ✅ onClick={() => incrementBy(5)} → S'exécute au clic
            
            La fonction fléchée () => {...} crée une fonction qui sera
            appelée SEULEMENT quand on clique, pas au render
            
            Flux:
            1. [Clic] → La fonction fléchée s'exécute
            2. [Call] → incrementBy(5) est appelée avec 5 en paramètre
            3. [Provider] → setCount(count + 5) s'exécute
            4. [Update] → count augmente de 5
            5. [Re-render] → Tous les composants se mettent à jour
          */}
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
