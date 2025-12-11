import React from 'react';
import { useShoppingCart } from '../ShoppingCartContext';

/**
 * COMPOSANT: CartStats
 * 
 * Affiche les statistiques du panier en temps réel
 * 
 * DÉMONSTRATION IMPORTANTE:
 * Ce composant ne reçoit AUCUNE prop de son parent!
 * Il accède directement aux données via le Context
 * 
 * Quand le panier change (dans ProductList ou CartSummary),
 * ce composant se met à jour AUTOMATIQUEMENT
 * C'est la magie du Context API! ✨
 */
const CartStats = () => {
  /**
   * On destructure 3 choses du Context:
   * - items: tableau des produits (pour compter les types)
   * - getItemCount: fonction qui calcule le total d'articles
   * - getTotal: fonction qui calcule le prix total
   */
  const { items, getItemCount, getTotal } = useShoppingCart();

  return (
    <div style={styles.container}>
      <h3>📊 Statistiques du Panier</h3>
      <div style={styles.stats}>
        <div style={styles.stat}>
          <div style={styles.statValue}>{items.length}</div>
          <div style={styles.statLabel}>Types de produits</div>
        </div>
        <div style={styles.stat}>
          <div style={styles.statValue}>{getItemCount()}</div>
          <div style={styles.statLabel}>Articles totaux</div>
        </div>
        <div style={styles.stat}>
          <div style={styles.statValue}>{getTotal().toFixed(2)}€</div>
          <div style={styles.statLabel}>Montant total</div>
        </div>
      </div>
      <p style={styles.note}>
        💡 Ce composant utilise le même Provider que les autres, 
        mais il ne reçoit aucune prop !
      </p>
    </div>
  );
};

const styles = {
  container: {
    margin: '20px',
    padding: '20px',
    border: '2px solid #9C27B0',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9'
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '15px',
    marginTop: '15px'
  },
  stat: {
    textAlign: 'center',
    padding: '15px',
    backgroundColor: 'white',
    borderRadius: '6px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  statValue: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#9C27B0',
    marginBottom: '5px'
  },
  statLabel: {
    fontSize: '12px',
    color: '#666'
  },
  note: {
    marginTop: '15px',
    fontSize: '14px',
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center'
  }
};

export default CartStats;
