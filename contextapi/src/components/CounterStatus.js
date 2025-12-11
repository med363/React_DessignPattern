import React, { useEffect } from 'react';
import { useCounter } from '../CounterContext';

/**
 * COMPOSANT 3: CounterStatus
 * 
 * Affiche des informations dérivées de l'état
 * 
 * DÉMONSTRATION: Ce composant lit le MÊME état que CounterDisplay
 * mais l'utilise différemment (pair/impair, positif/négatif)
 * 
 * Il se met à jour automatiquement quand count change!
 */
const CounterStatus = () => {
  /**
   * LECTURE DE L'ÉTAT
   * Ce composant s'abonne au Context en appelant useCounter()
   */
  const { count } = useCounter();
  
  /**
   * CALCULS DÉRIVÉS (Derived State)
   * ════════════════════════════════════════════════════════════
   * 
   * Ces valeurs sont CALCULÉES à partir de 'count'
   * Elles ne sont PAS stockées dans le state
   * 
   * IMPORTANT: Ces calculs se re-exécutent à CHAQUE render!
   * 
   * Quand count change:
   * 1. Le Provider met à jour count (ex: 0 → 1)
   * 2. React re-render ce composant
   * 3. Ces lignes se ré-exécutent avec la nouvelle valeur
   * 4. isEven passe de true à false (0 est pair, 1 est impair)
   * 5. isPositive passe de false à true (1 > 0)
   * 6. L'UI affiche les nouvelles valeurs!
   * 
   * C'est automatique, on n'a rien à faire! ✨
   */
  const isEven = count % 2 === 0;      // Pair si le reste de la division par 2 = 0
  const isPositive = count > 0;        // Positif si supérieur à 0
  const isZero = count === 0;          // Zéro si exactement 0
  const isNegative = count < 0;        // Négatif si inférieur à 0
  
  /**
   * OBSERVER LES RE-RENDERS avec useEffect
   * ════════════════════════════════════════════════════════════
   * 
   * useEffect sans dépendances (pas de []) s'exécute à CHAQUE render
   * 
   * Ce log prouve que:
   * 1. Ce composant se re-render quand count change
   * 2. Il se re-render même si le changement vient d'un AUTRE composant
   * 3. Tous les composants qui lisent count se mettent à jour ensemble
   * 
   * EXPÉRIENCE:
   * 1. Ouvrez la console (F12)
   * 2. Cliquez sur +1 dans CounterControls
   * 3. Vous verrez:
   *    - 🔵 increment() appelé (dans CounterContext)
   *    - 🔄 CounterDisplay re-rendered (ici)
   *    - 🔄 CounterStatus re-rendered (ici aussi!)
   * 
   * Les 3 composants se synchronisent automatiquement! 🎯
   */
  useEffect(() => {
    console.log('🔄 CounterStatus re-rendered avec count =', count);
  });

  return (
    <div style={styles.card}>
      <h2>📈 Statut du Compteur</h2>
      
      <div style={styles.statusGrid}>
        <div style={{
          ...styles.statusItem,
          backgroundColor: isEven ? '#4CAF50' : '#FF9800'
        }}>
          <div style={styles.statusLabel}>Type</div>
          <div style={styles.statusValue}>
            {isEven ? '✅ Pair' : '🔶 Impair'}
          </div>
        </div>

        <div style={{
          ...styles.statusItem,
          backgroundColor: isPositive ? '#2196F3' : isZero ? '#9E9E9E' : '#f44336'
        }}>
          <div style={styles.statusLabel}>Signe</div>
          <div style={styles.statusValue}>
            {isPositive ? '➕ Positif' : isZero ? '⚫ Zéro' : '➖ Négatif'}
          </div>
        </div>

        <div style={styles.statusItem}>
          <div style={styles.statusLabel}>Carré</div>
          <div style={styles.statusValue}>{count * count}</div>
        </div>

        <div style={styles.statusItem}>
          <div style={styles.statusLabel}>Double</div>
          <div style={styles.statusValue}>{count * 2}</div>
        </div>
      </div>

      <p style={styles.info}>
        🔍 Ce composant calcule des valeurs dérivées
        <br />
        🔄 Il se met à jour automatiquement avec l'état partagé
        <br /><br />
        <strong>Mécanisme de mise à jour:</strong>
        <br />1️⃣ count change dans le Provider (ex: clic sur +1)
        <br />2️⃣ React détecte le changement
        <br />3️⃣ Ce composant se re-render automatiquement
        <br />4️⃣ Les calculs (pair/impair, etc.) se ré-exécutent
        <br />5️⃣ L'UI affiche les nouvelles valeurs!
      </p>
    </div>
  );
};

const styles = {
  card: {
    border: '3px solid #9C27B0',
    borderRadius: '12px',
    padding: '20px',
    margin: '10px',
    backgroundColor: '#f9f0ff'
  },
  statusGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '15px',
    marginTop: '15px'
  },
  statusItem: {
    backgroundColor: '#673AB7',
    color: 'white',
    padding: '15px',
    borderRadius: '8px',
    textAlign: 'center'
  },
  statusLabel: {
    fontSize: '12px',
    opacity: 0.8,
    marginBottom: '5px'
  },
  statusValue: {
    fontSize: '20px',
    fontWeight: 'bold'
  },
  info: {
    fontSize: '13px',
    color: '#666',
    fontStyle: 'italic',
    marginTop: '15px',
    textAlign: 'center'
  }
};

export default CounterStatus;
