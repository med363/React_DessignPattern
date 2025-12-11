import { useState, useReducer } from 'react';
import './App.css';

// ========================================
// Example 1: Managing Multiple States WITHOUT useReducer
// ========================================
function CounterWithoutReducer() {
  // Managing multiple related states separately with useState
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [history, setHistory] = useState([]);

  const increment = () => {
    setCount(count + step);
    setHistory([...history, `+${step}`]);
  };

  const decrement = () => {
    setCount(count - step);
    setHistory([...history, `-${step}`]);
  };

  const reset = () => {
    setCount(0);
    setStep(1);
    setHistory([]);
  };

  return (
    <div style={{ padding: '20px', border: '2px solid #61dafb', margin: '20px', borderRadius: '8px' }}>
      <h2>Example 1: WITHOUT useReducer</h2>
      <p>Count: <strong>{count}</strong></p>
      <p>Step: <strong>{step}</strong></p>
      
      <div style={{ marginBottom: '10px' }}>
        <button onClick={increment} style={{ margin: '5px' }}>Increment</button>
        <button onClick={decrement} style={{ margin: '5px' }}>Decrement</button>
        <button onClick={reset} style={{ margin: '5px' }}>Reset</button>
      </div>
      
      <div>
        <label>Change Step: </label>
        <input 
          type="number" 
          value={step} 
          onChange={(e) => setStep(Number(e.target.value))}
          style={{ margin: '5px', width: '60px' }}
        />
      </div>
      
      <div style={{ marginTop: '10px' }}>
        <strong>History:</strong> {history.join(', ') || 'No actions yet'}
      </div>
    </div>
  );
}

// ========================================
// Example 2: Managing Multiple States WITH useReducer
// ========================================

// Reducer function - centralized state logic
function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + state.step,
        history: [...state.history, `+${state.step}`]
      };
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - state.step,
        history: [...state.history, `-${state.step}`]
      };
    case 'SET_STEP':
      return {
        ...state,
        step: action.payload
      };
    case 'RESET':
      return {
        count: 0,
        step: 1,
        history: []
      };
    default:
      return state;
  }
}

function CounterWithReducer() {
  // Managing multiple related states together with useReducer
  const [state, dispatch] = useReducer(counterReducer, {
    count: 0,
    step: 1,
    history: []
  });

  return (
    <div style={{ padding: '20px', border: '2px solid #82ca9d', margin: '20px', borderRadius: '8px' }}>
      <h2>Example 2: WITH useReducer</h2>
      <p>Count: <strong>{state.count}</strong></p>
      <p>Step: <strong>{state.step}</strong></p>
      
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => dispatch({ type: 'INCREMENT' })} style={{ margin: '5px' }}>
          Increment
        </button>
        <button onClick={() => dispatch({ type: 'DECREMENT' })} style={{ margin: '5px' }}>
          Decrement
        </button>
        <button onClick={() => dispatch({ type: 'RESET' })} style={{ margin: '5px' }}>
          Reset
        </button>
      </div>
      
      <div>
        <label>Change Step: </label>
        <input 
          type="number" 
          value={state.step} 
          onChange={(e) => dispatch({ type: 'SET_STEP', payload: Number(e.target.value) })}
          style={{ margin: '5px', width: '60px' }}
        />
      </div>
      
      <div style={{ marginTop: '10px' }}>
        <strong>History:</strong> {state.history.join(', ') || 'No actions yet'}
      </div>
    </div>
  );
}

// ========================================
// Main App Component
// ========================================
function App() {
  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1>useState vs useReducer Comparison</h1>
      <p style={{ marginBottom: '20px' }}>
        Both examples manage the same functionality with count, step, and history states.
        <br />
        <strong>useReducer</strong> is better when you have complex state logic with multiple sub-values
        or when the next state depends on the previous one.
      </p>
      
      <CounterWithoutReducer />
      <CounterWithReducer />
    </div>
  );
}

export default App;
