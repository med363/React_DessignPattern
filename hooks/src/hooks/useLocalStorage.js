import { useState, useEffect } from 'react';

/**
 * CUSTOM HOOK: useLocalStorage
 * 
 * Pourquoi utiliser ce hook?
 * - Synchroniser automatiquement l'état React avec le localStorage du navigateur
 * - Persister les données même après rechargement de la page
 * - Réutiliser cette logique pour n'importe quelle donnée (nom, préférences, etc.)
 * - Éviter d'écrire localStorage.getItem/setItem à chaque fois
 * 
 * @param {string} key - La clé dans localStorage
 * @param {any} initialValue - Valeur par défaut si rien dans localStorage
 * @returns {array} - [valeur, setValeur] comme useState
 */
function useLocalStorage(key, initialValue) {
  // ÉTAPE 1: Initialisation - récupérer la valeur depuis localStorage
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Essayer de récupérer la valeur existante dans localStorage
      const item = window.localStorage.getItem(key);
      // Si elle existe, la parser (convertir de JSON en objet), sinon utiliser initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // ÉTAPE 2: Synchronisation - sauvegarder dans localStorage quand la valeur change
  useEffect(() => {
    try {
      // Sauvegarder automatiquement dans localStorage à chaque changement
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]); // Se déclenche quand key ou storedValue change

  // Retourne comme useState: [valeur, fonction pour modifier]
  return [storedValue, setStoredValue];
}

export default useLocalStorage;
