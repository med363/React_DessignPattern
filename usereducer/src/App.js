import { useState, useReducer } from 'react';
import './App.css';

// Problem with useState: Stale state in async operations
function CounterWithStateAnomaly() {
  const [count, setCount] = useState(0);

  // This demonstrates the stale closure problem
  const incrementAsync = () => {
    setTimeout(() => {
      // This captures the current value of 'count' when the function is called
      // If you click multiple times quickly, all timeouts use the same old value
      setCount(count + 1); // ANOMALY: Uses stale state!
    }, 1000);
  };

  return (
    <div style={{ padding: '20px', border: '2px solid #ff6b6b', margin: '20px' }}>
      <h2>useState - Stale State Anomaly ❌</h2>
      <p>Count: {count}</p>
      <button onClick={incrementAsync}>Increment After 1s</button>
      <p style={{ fontSize: '12px', color: '#666' }}>
        Try clicking multiple times quickly - only one increment happens!
      </p>
    </div>
  );
}

// Solution with useReducer: Always uses current state
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    default:
      return state;
  }
}

function CounterWithReducer() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  const incrementAsync = () => {
    setTimeout(() => {
      // dispatch always works with the current state
      // Multiple clicks will all work correctly
      dispatch({ type: 'increment' }); // ✅ Uses current state!
    }, 1000);
  };

  return (
    <div style={{ padding: '20px', border: '2px solid #51cf66', margin: '20px' }}>
      <h2>useReducer - No Anomaly ✅</h2>
      <p>Count: {state.count}</p>
      <button onClick={incrementAsync}>Increment After 1s</button>
      <p style={{ fontSize: '12px', color: '#666' }}>
        Try clicking multiple times quickly - all increments work!
      </p>
    </div>
  );
}

// Alternative fix with useState using functional update
function CounterWithStateFix() {
  const [count, setCount] = useState(0);

  const incrementAsync = () => {
    setTimeout(() => {
      // Using functional update - receives current state as parameter
      setCount(prevCount => prevCount + 1); // ✅ Also works!
    }, 1000);
  };

  return (
    <div style={{ padding: '20px', border: '2px solid #4dabf7', margin: '20px' }}>
      <h2>useState with Functional Update ✅</h2>
      <p>Count: {count}</p>
      <button onClick={incrementAsync}>Increment After 1s</button>
      <p style={{ fontSize: '12px', color: '#666' }}>
        Using prevCount =&gt; prevCount + 1 also works!
      </p>
    </div>
  );
}

function App() {
  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1>useReducer: Understanding the Stale State Anomaly</h1>
      <p>
        <strong>The Problem:</strong> When using useState with async operations or callbacks,
        the state value can become "stale" (outdated) because closures capture the value at the time they're created.
      </p>
      <p>
        <strong>The Solution:</strong> useReducer always works with the current state, 
        or you can use functional updates with useState.
      </p>
      
      <CounterWithStateAnomaly />
      <CounterWithReducer />
      <CounterWithStateFix />
    </div>
  );
}

export default App;
