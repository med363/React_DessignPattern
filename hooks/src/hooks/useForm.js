import { useState } from 'react';

/**
 * 🎯 CUSTOM HOOK: useForm
 * 
 * ═══════════════════════════════════════════════════════════════
 * CONCEPT D'ENCAPSULATION (Encapsulation)
 * ═══════════════════════════════════════════════════════════════
 * 
 * SANS custom hook (logique NON encapsulée):
 * ------------------------------------------
 * function MyComponent() {
 *   const [email, setEmail] = useState('');
 *   const [password, setPassword] = useState('');
 *   
 *   const handleEmailChange = (e) => setEmail(e.target.value);
 *   const handlePasswordChange = (e) => setPassword(e.target.value);
 *   const handleReset = () => {
 *     setEmail('');
 *     setPassword('');
 *   };
 *   // ... répéter ce code dans chaque composant de formulaire 😫
 * }
 * 
 * AVEC custom hook (logique ENCAPSULÉE):
 * --------------------------------------
 * function MyComponent() {
 *   const form = useForm({ email: '', password: '' });
 *   // Tout est encapsulé! ✨
 * }
 * 
 * ═══════════════════════════════════════════════════════════════
 * AVANTAGES DE L'ENCAPSULATION:
 * ═══════════════════════════════════════════════════════════════
 * ✅ Cache la complexité interne (useState, handleChange, etc.)
 * ✅ Réutilisable pour n'importe quel formulaire
 * ✅ Un seul endroit pour corriger les bugs
 * ✅ Interface simple et claire: values, handleChange, reset
 * ✅ Le composant ne voit que ce dont il a besoin
 * 
 * @param {object} initialValues - Les valeurs initiales du formulaire
 * @returns {object} - { values, handleChange, reset }
 */
function useForm(initialValues) {
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // LOGIQUE INTERNE ENCAPSULÉE (cachée du composant)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  // État pour stocker toutes les valeurs du formulaire
  const [values, setValues] = useState(initialValues);

  /**
   * Fonction générique pour gérer TOUS les champs du formulaire
   * Cette logique est ENCAPSULÉE - le composant n'a pas besoin de la connaître
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prevValues => ({
      ...prevValues,      // Garder les autres valeurs
      [name]: value       // Mettre à jour seulement le champ modifié
    }));
  };

  /**
   * Réinitialiser tous les champs à leurs valeurs initiales
   */
  const reset = () => {
    setValues(initialValues);
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // INTERFACE PUBLIQUE (ce que le composant voit)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  return {
    values,        // Les valeurs actuelles
    handleChange,  // Fonction pour gérer les changements
    reset          // Fonction pour réinitialiser
  };
  
  // Le composant n'a PAS besoin de savoir comment handleChange fonctionne!
  // C'est ça l'ENCAPSULATION ✨
}

export default useForm;
