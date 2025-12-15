import { useState } from 'react';

/**
 * ═══════════════════════════════════════════════════════════════════
 * CUSTOM HOOK: useToggle
 * ═══════════════════════════════════════════════════════════════════
 * 
 * 🎯 OBJECTIF
 * ───────────
 * Gérer un état booléen (true/false) avec des fonctions claires
 * 
 * 
 * 💼 CAS D'UTILISATION
 * ────────────────────
 * - Ouvrir/fermer une modale
 * - Afficher/cacher un menu
 * - Activer/désactiver un mode (ex: mode sombre)
 * - Montrer/masquer un mot de passe
 * 
 * 
 * ❌ SANS HOOK (code répété):
 * ────────────────────────────
 * const [isOpen, setIsOpen] = useState(false);
 * const open = () => setIsOpen(true);
 * const close = () => setIsOpen(false);
 * const toggle = () => setIsOpen(!isOpen);
 * 
 * // Répéter ce code dans chaque composant qui a besoin de toggle 😫
 * 
 * 
 * ✅ AVEC HOOK (réutilisable):
 * ────────────────────────────
 * const [isOpen, open, close, toggle] = useToggle(false);
 * // Une seule ligne! ✨
 * 
 * 
 * @param {boolean} initialState - État initial (true ou false)
 * @returns {array} - [state, setTrue, setFalse, toggle]
 */
function useToggle(initialState = false) {
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ÉTAPE 1: CRÉER L'ÉTAT BOOLÉEN
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const [state, setState] = useState(initialState);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ÉTAPE 2: CRÉER DES FONCTIONS AVEC DES NOMS CLAIRS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  /**
   * Mettre à TRUE (activer, ouvrir, afficher)
   */
  const setTrue = () => setState(true);
  
  /**
   * Mettre à FALSE (désactiver, fermer, cacher)
   */
  const setFalse = () => setState(false);
  
  /**
   * INVERSER l'état actuel
   * Si true → devient false
   * Si false → devient true
   */
  const toggle = () => setState(prev => !prev);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ÉTAPE 3: RETOURNER EN TABLEAU (comme useState)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // On retourne un tableau pour utiliser la déstructuration
  return [state, setTrue, setFalse, toggle];

  // ✨ Le composant peut déstructurer avec des noms personnalisés:
  // const [isOpen, open, close, toggle] = useToggle(false);
  // const [isVisible, show, hide, toggle] = useToggle(false);
}

export default useToggle;

/**
 * ═══════════════════════════════════════════════════════════════════
 * 📖 EXEMPLES D'UTILISATION
 * ═══════════════════════════════════════════════════════════════════
 * 
 * // EXEMPLE 1: Modale
 * function ModalExample() {
 *   const [isModalOpen, openModal, closeModal] = useToggle(false);
 * 
 *   return (
 *     <>
 *       <button onClick={openModal}>Ouvrir</button>
 *       {isModalOpen && (
 *         <Modal onClose={closeModal}>
 *           <h2>Contenu de la modale</h2>
 *         </Modal>
 *       )}
 *     </>
 *   );
 * }
 * 
 * 
 * // EXEMPLE 2: Menu mobile
 * function MobileMenu() {
 *   const [isMenuOpen, openMenu, closeMenu, toggleMenu] = useToggle(false);
 * 
 *   return (
 *     <>
 *       <button onClick={toggleMenu}>☰ Menu</button>
 *       {isMenuOpen && (
 *         <nav>
 *           <a href="/" onClick={closeMenu}>Accueil</a>
 *           <a href="/about" onClick={closeMenu}>À propos</a>
 *         </nav>
 *       )}
 *     </>
 *   );
 * }
 * 
 * 
 * ✅ AVANTAGES:
 * - Noms de fonctions explicites (open, close au lieu de setTrue, setFalse)
 * - Moins de code répété
 * - Plus facile à lire et maintenir
 * - Même logique réutilisée partout
 */
