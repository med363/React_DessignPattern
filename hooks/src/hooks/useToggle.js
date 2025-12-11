import { useState } from 'react';

/**
 * 🎯 CUSTOM HOOK: useToggle
 * 
 * ═══════════════════════════════════════════════════════════════
 * EXEMPLE SIMPLE D'ENCAPSULATION
 * ═══════════════════════════════════════════════════════════════
 * 
 * SANS encapsulation (logique répétée partout):
 * ---------------------------------------------
 * const [isOpen, setIsOpen] = useState(false);
 * const open = () => setIsOpen(true);
 * const close = () => setIsOpen(false);
 * const toggle = () => setIsOpen(!isOpen);
 * 
 * AVEC encapsulation (hook réutilisable):
 * ---------------------------------------
 * const [isOpen, open, close, toggle] = useToggle(false);
 * 
 * ═══════════════════════════════════════════════════════════════
 * POURQUOI ENCAPSULER CETTE LOGIQUE SIMPLE?
 * ═══════════════════════════════════════════════════════════════
 * ✅ Évite de réécrire le même code pour les modales, menus, etc.
 * ✅ Nommage cohérent dans toute l'application
 * ✅ Plus facile à tester
 * ✅ Un seul endroit pour ajouter des fonctionnalités (ex: callbacks)
 * 
 * @param {boolean} initialState - État initial (true ou false)
 * @returns {array} - [state, setTrue, setFalse, toggle]
 */
function useToggle(initialState = false) {
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // LOGIQUE ENCAPSULÉE
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  const [state, setState] = useState(initialState);

  // Mettre à true
  const setTrue = () => setState(true);
  
  // Mettre à false
  const setFalse = () => setState(false);
  
  // Inverser l'état actuel (true ↔ false)
  const toggle = () => setState(prev => !prev);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // INTERFACE SIMPLE
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  // Toute la logique ci-dessus est CACHÉE dans le hook
  // Le composant reçoit seulement 4 valeurs simples à utiliser
  return [state, setTrue, setFalse, toggle];
}

export default useToggle;
