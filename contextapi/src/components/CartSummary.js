import React from 'react';
import { useShoppingCart } from '../ShoppingCartContext';

const CartSummary = () => {
  const { 
    items, 
    isOpen, 
    removeItem, 
    addItem,
    decreaseQuantity,
    clearCart, 
    getTotal, 
    getItemCount,
    toggleCart 
  } = useShoppingCart();

  return (
    <>
      {/* Bouton du panier */}
      <div style={styles.cartButton} onClick={toggleCart}>
        🛒 Panier ({getItemCount()})
        <span style={styles.total}>{getTotal().toFixed(2)}€</span>
      </div>

      {/* Modal du panier */}
      {isOpen && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <div style={styles.header}>
              <h2>🛒 Votre Panier</h2>
              <button onClick={toggleCart} style={styles.closeBtn}>✕</button>
            </div>

            {items.length === 0 ? (
              <p style={styles.empty}>Votre panier est vide</p>
            ) : (
              <>
                <div style={styles.items}>
                  {items.map(item => (
                    <div key={item.id} style={styles.item}>
                      <div style={styles.itemInfo}>
                        <span style={styles.itemEmoji}>{item.emoji}</span>
                        <div>
                          <strong>{item.name}</strong>
                          <div style={styles.itemPrice}>{item.price}€</div>
                        </div>
                      </div>
                      <div style={styles.controls}>
                        <button 
                          onClick={() => decreaseQuantity(item.id)}
                          style={styles.controlBtn}
                        >
                          -
                        </button>
                        <span style={styles.quantity}>{item.quantity}</span>
                        <button 
                          onClick={() => addItem(item)}
                          style={styles.controlBtn}
                        >
                          +
                        </button>
                        <button 
                          onClick={() => removeItem(item.id)}
                          style={styles.removeBtn}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={styles.footer}>
                  <div style={styles.totalSection}>
                    <strong>Total:</strong>
                    <strong style={styles.totalPrice}>{getTotal().toFixed(2)}€</strong>
                  </div>
                  <button onClick={clearCart} style={styles.clearBtn}>
                    Vider le panier
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  cartButton: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    backgroundColor: '#2196F3',
    color: 'white',
    padding: '12px 20px',
    borderRadius: '25px',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    fontWeight: 'bold',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  total: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    padding: '4px 8px',
    borderRadius: '12px'
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '500px',
    maxHeight: '80vh',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    borderBottom: '2px solid #eee'
  },
  closeBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#666'
  },
  empty: {
    textAlign: 'center',
    padding: '40px',
    color: '#999'
  },
  items: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px'
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    borderBottom: '1px solid #eee'
  },
  itemInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  itemEmoji: {
    fontSize: '32px'
  },
  itemPrice: {
    color: '#666',
    fontSize: '14px'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  controlBtn: {
    width: '30px',
    height: '30px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '16px'
  },
  quantity: {
    minWidth: '30px',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  removeBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    marginLeft: '8px'
  },
  footer: {
    padding: '20px',
    borderTop: '2px solid #eee'
  },
  totalSection: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '18px',
    marginBottom: '15px'
  },
  totalPrice: {
    color: '#4CAF50',
    fontSize: '24px'
  },
  clearBtn: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px'
  }
};

export default CartSummary;
