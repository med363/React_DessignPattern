import React from 'react';
import { useShoppingCart } from '../ShoppingCartContext';

const ProductList = () => {
  const { addItem } = useShoppingCart();

  const products = [
    { id: 1, name: 'Laptop', price: 999, emoji: '💻' },
    { id: 2, name: 'Souris', price: 29, emoji: '🖱️' },
    { id: 3, name: 'Clavier', price: 79, emoji: '⌨️' },
    { id: 4, name: 'Écran', price: 299, emoji: '🖥️' }
  ];

  return (
    <div style={styles.container}>
      <h2>📦 Produits Disponibles</h2>
      <div style={styles.grid}>
        {products.map(product => (
          <div key={product.id} style={styles.productCard}>
            <div style={styles.emoji}>{product.emoji}</div>
            <h3>{product.name}</h3>
            <p style={styles.price}>{product.price}€</p>
            <button 
              onClick={() => addItem(product)}
              style={styles.button}
            >
              + Ajouter au panier
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    margin: '10px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '15px',
    marginTop: '20px'
  },
  productCard: {
    border: '2px solid #4CAF50',
    borderRadius: '8px',
    padding: '15px',
    textAlign: 'center',
    backgroundColor: '#f9f9f9'
  },
  emoji: {
    fontSize: '48px',
    marginBottom: '10px'
  },
  price: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#4CAF50',
    margin: '10px 0'
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  }
};

export default ProductList;
