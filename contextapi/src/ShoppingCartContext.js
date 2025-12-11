import React, { createContext, useState, useContext } from 'react';

/**
 * ÉTAPE 1: CRÉER LE CONTEXT
 * createContext() crée un objet Context qui permet de partager des données
 * entre des composants sans passer par les props (évite le props drilling)
 */
const ShoppingCartContext = createContext();

/**
 * ÉTAPE 2: CRÉER UN HOOK PERSONNALISÉ (Pattern recommandé)
 * Ce hook facilite l'utilisation du Context et ajoute une validation
 * Au lieu d'utiliser useContext(ShoppingCartContext) partout,
 * on utilise simplement useShoppingCart()
 * 
 * Avantages:
 * - Code plus propre et lisible
 * - Détection d'erreur si utilisé hors du Provider
 * - Un seul endroit à modifier si la logique change
 */
export const useShoppingCart = () => {
  // Récupère la valeur actuelle du Context
  const context = useContext(ShoppingCartContext);
  
  // Vérifie que le hook est utilisé à l'intérieur du Provider
  // Sinon, context sera undefined
  if (!context) {
    throw new Error('useShoppingCart doit être utilisé dans ShoppingCartProvider');
  }
  
  return context;
};

/**
 * ÉTAPE 3: CRÉER LE PROVIDER COMPONENT
 * Le Provider est un composant React qui:
 * 1. Contient l'état (state) à partager
 * 2. Contient la logique métier (fonctions)
 * 3. Enveloppe les composants enfants via {children}
 * 4. Fournit les données via la prop "value"
 * 
 * Tout composant enfant (direct ou indirect) peut accéder aux données
 */
export const ShoppingCartProvider = ({ children }) => {
  // STATE 1: Liste des articles dans le panier
  // Chaque item contient: {id, name, price, emoji, quantity}
  const [items, setItems] = useState([]);
  
  // STATE 2: État d'ouverture/fermeture du panier
  const [isOpen, setIsOpen] = useState(false);

  /**
   * FONCTION 1: Ajouter un produit au panier
   * Cette fonction gère deux cas:
   * - Si le produit existe déjà: augmenter la quantité
   * - Si le produit est nouveau: l'ajouter avec quantity = 1
   * 
   * @param {Object} product - Le produit à ajouter {id, name, price, emoji}
   */
  const addItem = (product) => {
    // setItems avec une fonction callback pour garantir la dernière valeur
    setItems(prevItems => {
      // Chercher si le produit existe déjà dans le panier
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // CAS 1: Le produit existe déjà
        // On map tous les items et on incrémente la quantité du bon produit
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }  // Spread + override
            : item  // Les autres items restent inchangés
        );
      } else {
        // CAS 2: Nouveau produit
        // On spread l'ancien tableau et on ajoute le nouveau produit
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  /**
   * FONCTION 2: Retirer complètement un produit du panier
   * Supprime l'item peu importe sa quantité
   * @param {number} productId - L'ID du produit à retirer
   */
  const removeItem = (productId) => {
    // filter() crée un nouveau tableau sans l'item spécifié
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  /**
   * FONCTION 3: Diminuer la quantité d'un produit
   * Si quantité = 1, le produit est retiré du panier
   * Sinon, on décrémente la quantité de 1
   * @param {number} productId - L'ID du produit
   */
  const decreaseQuantity = (productId) => {
    setItems(prevItems => {
      // Trouver le produit concerné
      const item = prevItems.find(item => item.id === productId);
      
      // Si quantité = 1, on retire le produit
      if (item.quantity === 1) {
        return prevItems.filter(item => item.id !== productId);
      }
      
      // Sinon, on décrémente la quantité
      return prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  /**
   * FONCTION 4: Vider complètement le panier
   * Réinitialise le tableau à vide
   */
  const clearCart = () => {
    setItems([]);
  };

  /**
   * FONCTION 5: Calculer le prix total du panier
   * Utilise reduce() pour additionner (prix * quantité) de chaque item
   * @returns {number} Le montant total
   */
  const getTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  /**
   * FONCTION 6: Compter le nombre total d'articles
   * Somme toutes les quantités (pas le nombre de types de produits)
   * @returns {number} Nombre total d'articles
   */
  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  /**
   * FONCTION 7: Basculer l'état d'ouverture du panier
   * Inverse la valeur booléenne (true ↔ false)
   */
  const toggleCart = () => {
    setIsOpen(prev => !prev);  // prev est la valeur précédente
  };

  /**
   * ÉTAPE 4: DÉFINIR LA VALEUR DU CONTEXT (API publique)
   * 
   * Cet objet contient TOUT ce qui sera accessible aux composants enfants
   * C'est "l'API publique" de notre Context
   * 
   * Important:
   * - Inclure uniquement ce qui doit être partagé
   * - Ne pas recréer cet objet à chaque render (causes re-renders inutiles)
   * - Pour optimiser, on peut utiliser useMemo()
   */
  const value = {
    // État (données)
    items,           // Tableau des produits dans le panier
    isOpen,          // Booléen pour l'ouverture du modal
    
    // Fonctions (actions)
    addItem,         // Ajouter un produit
    removeItem,      // Retirer un produit
    decreaseQuantity, // Diminuer la quantité
    clearCart,       // Vider le panier
    getTotal,        // Calculer le total
    getItemCount,    // Compter les articles
    toggleCart       // Ouvrir/fermer le panier
  };

  /**
   * ÉTAPE 5: RETOURNER LE PROVIDER
   * 
   * Le Provider enveloppe tous les composants enfants ({children})
   * et leur fournit accès à 'value' via useContext()
   * 
   * Tous les composants descendants peuvent maintenant utiliser:
   * const { items, addItem, ... } = useShoppingCart();
   */
  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
