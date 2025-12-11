import React, { createContext, useState, useContext } from 'react';

// 1. Créer le Context
const ShoppingCartContext = createContext();

// 2. Créer un Hook personnalisé pour faciliter l'utilisation
export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error('useShoppingCart doit être utilisé dans ShoppingCartProvider');
  }
  return context;
};

// 3. Créer le Provider avec TOUTE la logique métier
export const ShoppingCartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Ajouter un produit au panier
  const addItem = (product) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Si le produit existe, augmenter la quantité
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Sinon, ajouter le nouveau produit
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Retirer un produit du panier
  const removeItem = (productId) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Diminuer la quantité
  const decreaseQuantity = (productId) => {
    setItems(prevItems => {
      const item = prevItems.find(item => item.id === productId);
      if (item.quantity === 1) {
        return prevItems.filter(item => item.id !== productId);
      }
      return prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  // Vider le panier
  const clearCart = () => {
    setItems([]);
  };

  // Calculer le total
  const getTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Compter les articles
  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  // Toggle panier
  const toggleCart = () => {
    setIsOpen(prev => !prev);
  };

  // VALEUR fournie par le Provider (l'API publique)
  const value = {
    items,
    isOpen,
    addItem,
    removeItem,
    decreaseQuantity,
    clearCart,
    getTotal,
    getItemCount,
    toggleCart
  };

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
