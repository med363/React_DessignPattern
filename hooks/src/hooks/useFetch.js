import { useState, useEffect } from 'react';

/**
 * CUSTOM HOOK: useFetch
 * 
 * Pourquoi utiliser ce hook?
 * - Réutiliser la même logique de fetch pour différentes API
 * - Gérer automatiquement loading, error, et data
 * - Éviter de répéter le code fetch dans chaque composant
 * - Refetch automatiquement quand l'URL change
 * 
 * @param {string} url - L'URL de l'API à appeler
 * @returns {object} - { data, loading, error }
 */
function useFetch(url) {
  // État pour stocker les données reçues
  const [data, setData] = useState(null);
  
  // État pour savoir si on est en train de charger
  const [loading, setLoading] = useState(true);
  
  // État pour stocker les erreurs éventuelles
  const [error, setError] = useState(null);

  // useEffect pour faire le fetch quand l'URL change
  useEffect(() => {
    // Réinitialiser les états au début
    setLoading(true);
    setError(null);

    // Faire la requête HTTP
    fetch(url)
      .then(response => {
        // Vérifier si la réponse est OK (status 200-299)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Convertir la réponse en JSON
        return response.json();
      })
      .then(data => {
        // Sauvegarder les données et arrêter le loading
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        // En cas d'erreur, la sauvegarder et arrêter le loading
        setError(error.message);
        setLoading(false);
      });
  }, [url]); // Se déclenche quand l'URL change

  // Retourne les 3 états pour que le composant les utilise
  return { data, loading, error };
}

export default useFetch;
