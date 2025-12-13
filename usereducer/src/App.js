import { useReducer } from 'react';
import './App.css';

// Reducer to manage complex nested state
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case 'APPLY_DISCOUNT':
      return {
        ...state,
        discount: action.payload
      };

    case 'CLEAR_CART':
      return {
        items: [],
        discount: 0
      };

    default:
      return state;
  }
}

function App() {
  const [cart, dispatch] = useReducer(cartReducer, {
    items: [],
    discount: 0
  });

  // Available products
  const products = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Mouse', price: 25 },
    { id: 3, name: 'Keyboard', price: 75 }
  ];

  // Calculate totals
  const subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * cart.discount) / 100;
  const total = subtotal - discountAmount;

  return (
    <div className="App" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>useReducer - Complex State Management</h1>
      <p>Shopping cart with nested state: items array + discount</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Products */}
        <div style={{ border: '2px solid #61dafb', padding: '20px', borderRadius: '8px' }}>
          <h2>Products</h2>
          {products.map(product => (
            <div key={product.id} style={{ marginBottom: '10px', padding: '10px', background: '#f8f9fa' }}>
              <strong>{product.name}</strong> - ${product.price}
              <button 
                onClick={() => dispatch({ type: 'ADD_ITEM', payload: product })}
                style={{ marginLeft: '10px', padding: '5px 10px' }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Cart */}
        <div style={{ border: '2px solid #51cf66', padding: '20px', borderRadius: '8px' }}>
          <h2>Shopping Cart</h2>
          {cart.items.length === 0 ? (
            <p>Cart is empty</p>
          ) : (
            <>
              {cart.items.map(item => (
                <div key={item.id} style={{ marginBottom: '10px', padding: '10px', background: '#f8f9fa' }}>
                  <strong>{item.name}</strong> - ${item.price}
                  <br />
                  Quantity: 
                  <input 
                    type="number" 
                    min="1"
                    value={item.quantity}
                    onChange={(e) => dispatch({ 
                      type: 'UPDATE_QUANTITY', 
                      payload: { id: item.id, quantity: parseInt(e.target.value) || 1 }
                    })}
                    style={{ width: '50px', margin: '0 10px' }}
                  />
                  <button 
                    onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                    style={{ padding: '3px 8px', background: '#ff6b6b', color: 'white' }}
                  >
                    Remove
                  </button>
                </div>
              ))}
              
              <div style={{ marginTop: '20px', borderTop: '2px solid #ddd', paddingTop: '10px' }}>
                <div>
                  <label>Discount (%): </label>
                  <input 
                    type="number" 
                    min="0" 
                    max="100"
                    value={cart.discount}
                    onChange={(e) => dispatch({ type: 'APPLY_DISCOUNT', payload: parseInt(e.target.value) || 0 })}
                    style={{ width: '60px', marginLeft: '10px' }}
                  />
                </div>
                <p>Subtotal: ${subtotal.toFixed(2)}</p>
                {cart.discount > 0 && <p>Discount ({cart.discount}%): -${discountAmount.toFixed(2)}</p>}
                <p><strong>Total: ${total.toFixed(2)}</strong></p>
                <button 
                  onClick={() => dispatch({ type: 'CLEAR_CART' })}
                  style={{ padding: '8px 16px', background: '#ff6b6b', color: 'white' }}
                >
                  Clear Cart
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* State Display */}
      <div style={{ marginTop: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
        <h4>Current Complex State:</h4>
        <pre style={{ fontSize: '12px', overflow: 'auto' }}>{JSON.stringify(cart, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
