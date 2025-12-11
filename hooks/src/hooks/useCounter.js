import { useState } from 'react';

/**
 * CUSTOM HOOK: useCounter
 * 
 * Pourquoi utiliser un custom hook?
 * - Réutiliser la même logique de compteur partout dans l'application
 * - Éviter de dupliquer le code setState, increment, decrement, reset
 * - Créer plusieurs compteurs indépendants facilement
 * 
 * @param {number} initialValue - La valeur initiale du compteur
 * @returns {object} - Retourne { count, increment, decrement, reset }
 */
function useCounter(initialValue = 0) {
  // État local du compteur
  const [count, setCount] = useState(initialValue);

  // Fonction pour incrémenter (+1)
  const increment = () => setCount(prev => prev + 1);
  
  // Fonction pour décrémenter (-1)
  const decrement = () => setCount(prev => prev - 1);
  
  // Fonction pour réinitialiser à la valeur initiale
  const reset = () => setCount(initialValue);

  // Retourne l'état et les fonctions pour que d'autres composants les utilisent
  return { count, increment, decrement, reset };
}

export default useCounter;
