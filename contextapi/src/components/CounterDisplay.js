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
  /**
   * LECTURE DE L'ÉTAT depuis le Context
   * 
   * useCounter() retourne l'objet 'value' du Provider
   * On destructure pour extraire seulement 'count'
   * 
   * ABONNEMENT AUTOMATIQUE:
   * En appelant useCounter(), ce composant s'"abonne" au Context
   * Quand count change dans le Provider, React notifie ce composant
   * et le re-render automatiquement avec la nouvelle valeur
   * 
   * C'est comme un système de notification:
   * - Provider: "count a changé!"
   * - CounterDisplay: "OK, je me re-render avec la nouvelle valeur!"
   */
  const { count } = useCounter();
  
  /**
   * useEffect SANS dépendances → s'exécute à CHAQUE render
   * 
   * POURQUOI CE COMPOSANT SE RE-RENDER?
   * 1. Le Provider change son état (count)
   * 2. React détecte que la valeur du Context a changé
   * 3. React cherche tous les composants qui utilisent useCounter()
   * 4. React re-render ces composants avec la nouvelle valeur
   * 5. Ce log s'exécute pour confirmer le re-render
   * 
   * IMPORTANT: Ce composant n'a AUCUN bouton!
   * Il ne fait que LIRE count, mais il se met à jour quand même!
   * C'est la magie du Context API! ✨
   */
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
