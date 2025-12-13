import { useState, useReducer } from 'react';
import './App.css';

// Example 1: Simple counter with useState
function CounterWithState() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '20px', border: '2px solid #61dafb', margin: '20px' }}>
      <h2>useState Example</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

// Example 2: Simple counter with useReducer
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      return state;
  }
}

function CounterWithReducer() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div style={{ padding: '20px', border: '2px solid #82ca9d', margin: '20px' }}>
      <h2>useReducer Example</h2>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}

function App() {
  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1>useState vs useReducer</h1>
      <CounterWithState />
      <CounterWithReducer />
    </div>
  );
}

export default App;
