import { useState } from 'react';

/**
 * ═══════════════════════════════════════════════════════════════════
 * CUSTOM HOOK: useCounter
 * ═══════════════════════════════════════════════════════════════════
 * 
 * 📚 QU'EST-CE QU'UN CUSTOM HOOK?
 * ────────────────────────────────
 * Un custom hook est une fonction JavaScript qui:
 * 1. Commence par "use" (convention React obligatoire)
 * 2. Peut utiliser d'autres hooks (useState, useEffect, etc.)
 * 3. Permet de RÉUTILISER de la logique entre composants
 * 4. Retourne des valeurs/fonctions que les composants peuvent utiliser
 * 
 * 
 * 🎯 POURQUOI CRÉER CE HOOK?
 * ──────────────────────────
 * SANS hook (logique répétée partout):
 * 
 *   function ComponentA() {
 *     const [count, setCount] = useState(0);
 *     const increment = () => setCount(count + 1);
 *     const decrement = () => setCount(count - 1);
 *     const reset = () => setCount(0);
 *     // ... utiliser count, increment, etc.
 *   }
 * 
 *   function ComponentB() {
 *     const [count, setCount] = useState(0);
 *     const increment = () => setCount(count + 1);
 *     const decrement = () => setCount(count - 1);
 *     const reset = () => setCount(0);
 *     // ... répéter le MÊME code encore et encore 😫
 *   }
 * 
 * AVEC hook (logique réutilisable):
 * 
 *   function ComponentA() {
 *     const counter = useCounter(0);
 *     // ✨ Tout est là! count, increment, decrement, reset
 *   }
 * 
 *   function ComponentB() {
 *     const counter = useCounter(0);
 *     // ✨ Même logique, zéro duplication!
 *   }
 * 
 * 
 * @param {number} initialValue - La valeur de départ du compteur
 * @returns {object} - { count, increment, decrement, reset }
 */
function useCounter(initialValue = 0) {
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ÉTAPE 1: CRÉER L'ÉTAT
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // useState retourne un tableau: [valeur, fonction pour modifier]
  const [count, setCount] = useState(initialValue);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ÉTAPE 2: CRÉER LES FONCTIONS POUR MANIPULER L'ÉTAT
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  /**
   * Incrémenter: Ajouter +1
   * 
   * NOTE: On utilise prev => prev + 1 au lieu de count + 1
   * Pourquoi? Pour avoir toujours la valeur la plus récente
   */
  const increment = () => {
    setCount(prev => prev + 1);
  };

  /**
   * Décrémenter: Enlever -1
   */
  const decrement = () => {
    setCount(prev => prev - 1);
  };

  /**
   * Reset: Revenir à la valeur initiale
   */
  const reset = () => {
    setCount(initialValue);
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ÉTAPE 3: RETOURNER L'INTERFACE PUBLIQUE
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // On retourne un objet avec tout ce dont le composant a besoin
  return {
    count,      // La valeur actuelle du compteur
    increment,  // Fonction pour +1
    decrement,  // Fonction pour -1
    reset       // Fonction pour réinitialiser
  };

  // ✨ RÉSULTAT: Le composant qui utilise ce hook reçoit
  // tout ce dont il a besoin sans connaître les détails internes!
}

export default useCounter;

/**
 * ═══════════════════════════════════════════════════════════════════
 * 📖 COMMENT UTILISER CE HOOK DANS UN COMPOSANT
 * ═══════════════════════════════════════════════════════════════════
 * 
 * import useCounter from './hooks/useCounter';
 * 
 * function MonComposant() {
 *   // Créer un compteur qui commence à 0
 *   const counter = useCounter(0);
 * 
 *   return (
 *     <div>
 *       <h1>Compteur: {counter.count}</h1>
 *       <button onClick={counter.increment}>+1</button>
 *       <button onClick={counter.decrement}>-1</button>
 *       <button onClick={counter.reset}>Reset</button>
 *     </div>
 *   );
 * }
 * 
 * ✅ AVANTAGES:
 * - Code propre et lisible
 * - Logique réutilisable dans d'autres composants
 * - Facile à tester
 * - Un seul endroit pour corriger les bugs
 */
