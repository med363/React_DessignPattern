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
  const { count } = useCounter();
  
  // Vérifier si le nombre est pair ou impair
  const isEven = count % 2 === 0;
  const isPositive = count > 0;
  const isZero = count === 0;
  const isNegative = count < 0;
  
  // Observer les re-renders
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
