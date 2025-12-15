import React, { useState } from 'react';
import './App.css';

function Counter() {
  const [count, setCount] = useState(0);

  // Simulate error when count reaches 5
  if (count === 5) {
    throw new Error('Counter reached 5! This is a simulated error.');
  }

  return (
    <div style={{ 
      padding: '40px', 
      maxWidth: '600px', 
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>
        Error Boundary Demo
      </h1>
      
      <div style={{ 
        padding: '30px', 
        backgroundColor: '#e7f3ff', 
        borderRadius: '8px',
        textAlign: 'center',
        marginTop: '30px'
      }}>
        <h2 style={{ color: '#0066cc' }}>Counter: {count}</h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>
          Click the button below. When it reaches 5, an error will be thrown!
        </p>
        <button 
          onClick={() => setCount(count + 1)}
          style={{
            padding: '12px 30px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          Increment Counter
        </button>
      </div>

      <div style={{ 
        marginTop: '40px', 
        padding: '20px', 
        backgroundColor: '#d4edda', 
        borderRadius: '8px',
        border: '1px solid #c3e6cb'
      }}>
        <h3 style={{ color: '#155724', marginTop: 0 }}>ℹ️ How it works</h3>
        <ul style={{ color: '#155724', lineHeight: '1.8' }}>
          <li>Click "Increment Counter" until it reaches 5</li>
          <li>When count = 5, an error is thrown</li>
          <li>Error Boundary catches it and shows the custom error page</li>
          <li>Click "Try Again" to reset and continue</li>
        </ul>
      </div>
    </div>
  );
}

function App() {
  return <Counter />;
}

export default App;
