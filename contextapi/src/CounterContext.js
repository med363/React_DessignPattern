import React, { createContext, useState, useContext } from 'react';

/**
 * EXEMPLE SIMPLE: COUNTER CONTEXT
 * 
 * Démonstration claire du changement d'état dans Context API
 * On va voir comment l'état se propage automatiquement à tous les composants
 */

// ÉTAPE 1: Créer le Context
const CounterContext = createContext();

// ÉTAPE 2: Hook personnalisé pour faciliter l'utilisation
export const useCounter = () => {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error('useCounter doit être utilisé dans CounterProvider');
  }
  return context;
};

/**
 * ÉTAPE 3: Créer le Provider
 * 
 * C'est ici que l'ÉTAT vit et que les CHANGEMENTS se produisent
 */
export const CounterProvider = ({ children }) => {
  // ====== ÉTAT LOCAL ======
  // Quand cet état change, TOUS les composants qui l'utilisent se re-render
  const [count, setCount] = useState(0);
  
  // ====== FONCTIONS POUR CHANGER L'ÉTAT ======
  
  /**
   * Incrémenter le compteur
   * IMPORTANT: Quand setCount est appelé, React:
   * 1. Met à jour l'état 'count'
   * 2. Re-render le Provider
   * 3. Re-render tous les composants qui utilisent useCounter()
   */
  const increment = () => {
    console.log('🔵 increment() appelé - avant:', count);
    setCount(count + 1);  // count + 1
    console.log('🔵 increment() terminé - après:', count + 1);
  };
  
  /**
   * Décrémenter le compteur
   */
  const decrement = () => {
    console.log('🔴 decrement() appelé - avant:', count);
    setCount(count - 1);  // count - 1
    console.log('🔴 decrement() terminé - après:', count - 1);
  };
  
  /**
   * Réinitialiser à zéro
   */
  const reset = () => {
    console.log('⚫ reset() appelé - remise à zéro');
    setCount(0);
  };
  
  /**
   * Incrémenter de X
   * @param {number} amount - Montant à ajouter
   */
  const incrementBy = (amount) => {
    console.log(`🟢 incrementBy(${amount}) appelé - avant:`, count);
    setCount(count + amount);
    console.log(`🟢 incrementBy(${amount}) terminé - après:`, count + amount);
  };
  
  /**
   * Doubler le compteur
   */
  const double = () => {
    console.log('🟡 double() appelé - avant:', count);
    setCount(count * 2);
    console.log('🟡 double() terminé - après:', count * 2);
  };

  // ====== VALEUR DU CONTEXT ======
  // Tout ce qui est ici sera accessible via useCounter()
  const value = {
    count,          // L'état actuel
    increment,      // +1
    decrement,      // -1
    reset,          // 0
    incrementBy,    // +X
    double          // *2
  };

  // ====== RETOUR DU PROVIDER ======
  return (
    <CounterContext.Provider value={value}>
      {children}
    </CounterContext.Provider>
  );
};
