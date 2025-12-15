import React, { useState } from 'react';

// This component will throw an error when the button is clicked
function BuggyComponent() {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setCounter(counter + 1);
  };

  // This will throw an error when counter reaches 3
  if (counter === 3) {
    throw new Error('I crashed! Counter reached 3');
  }

  return (
    <div style={{
      padding: '20px',
      margin: '20px',
      border: '2px solid #4dabf7',
      borderRadius: '8px',
      backgroundColor: '#e7f5ff'
    }}>
      <h2 style={{ color: '#1864ab' }}>Buggy Counter Component</h2>
      <p>Click the button. When counter reaches 3, it will crash!</p>
      <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1971c2' }}>
        Counter: {counter}
      </p>
      <button
        onClick={handleClick}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4dabf7',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        Increment Counter
      </button>
    </div>
  );
}

export default BuggyComponent;
