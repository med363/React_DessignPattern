import React, { useState } from 'react';

function BuggyComponent() {
  const [count, setCount] = useState(0);

  if (count === 5) {
    throw new Error('Crash at count 5!');
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>Counter: {count}</h3>
      <button 
        onClick={() => setCount(count + 1)}
        style={{
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Click Me (crashes at 5)
      </button>
    </div>
  );
}

export default BuggyComponent;
