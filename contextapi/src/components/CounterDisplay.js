import React, { useEffect } from 'react';
import { useCounter } from '../CounterContext';

/**
 * COMPOSANT 1: CounterDisplay
 * 
 * AFFICHE simplement la valeur du compteur
 * Ne contient AUCUN bouton, ne change PAS l'état
 * 
 * OBSERVATION: Ce composant se re-render automatiquement
 * quand d'autres composants changent le count!
 */
const CounterDisplay = () => {
  const { count } = useCounter();
  
  // useEffect pour observer les re-renders
  useEffect(() => {
    console.log('🔄 CounterDisplay re-rendered avec count =', count);
  });

  return (
    <div style={styles.card}>
      <h2>📊 Affichage du Compteur</h2>
      <div style={styles.displayBox}>
        <div style={styles.label}>Valeur actuelle:</div>
        <div style={styles.number}>{count}</div>
      </div>
      <p style={styles.info}>
        💡 Ce composant ne fait qu'AFFICHER
        <br />
        Il se met à jour automatiquement quand l'état change ailleurs!
      </p>
    </div>
  );
};

const styles = {
  card: {
    border: '3px solid #2196F3',
    borderRadius: '12px',
    padding: '20px',
    margin: '10px',
    backgroundColor: '#f0f8ff',
    textAlign: 'center'
  },
  displayBox: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    margin: '15px 0',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  label: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '10px'
  },
  number: {
    fontSize: '72px',
    fontWeight: 'bold',
    color: '#2196F3',
    fontFamily: 'monospace'
  },
  info: {
    fontSize: '13px',
    color: '#666',
    fontStyle: 'italic',
    marginTop: '15px'
  }
};

export default CounterDisplay;
