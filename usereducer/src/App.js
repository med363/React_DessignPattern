import { useReducer } from 'react';
import './App.css';

// Reducer: Single source of truth for state logic
function counterReducer(state, action) {
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

// Component 1: Displays count
function CountDisplay({ count }) {
  return (
    <div style={{ padding: '20px', border: '2px solid #61dafb', margin: '10px' }}>
      <h3>Count Display</h3>
      <p style={{ fontSize: '48px', margin: '10px 0' }}>{count}</p>
    </div>
  );
}

// Component 2: Controls increment/decrement
function CountControls({ dispatch }) {
  return (
    <div style={{ padding: '20px', border: '2px solid #51cf66', margin: '10px' }}>
      <h3>Count Controls</h3>
      <button onClick={() => dispatch({ type: 'increment' })} style={{ margin: '5px', padding: '10px 20px' }}>
        +1
      </button>
      <button onClick={() => dispatch({ type: 'decrement' })} style={{ margin: '5px', padding: '10px 20px' }}>
        -1
      </button>
    </div>
  );
}

// Component 3: Shows count status
function CountStatus({ count }) {
  const status = count === 0 ? 'Zero' : count > 0 ? 'Positive' : 'Negative';
  const color = count === 0 ? '#gray' : count > 0 ? '#51cf66' : '#ff6b6b';

  return (
    <div style={{ padding: '20px', border: `2px solid ${color}`, margin: '10px' }}>
      <h3>Count Status</h3>
      <p>Current Status: <strong style={{ color }}>{status}</strong></p>
      <p>Value: {count}</p>
    </div>
  );
}

// Component 4: Reset button
function ResetButton({ dispatch, count }) {
  return (
    <div style={{ padding: '20px', border: '2px solid #ffd43b', margin: '10px' }}>
      <h3>Reset Control</h3>
      <button 
        onClick={() => dispatch({ type: 'reset' })}
        disabled={count === 0}
        style={{ padding: '10px 20px', background: count === 0 ? '#ccc' : '#ffd43b' }}
      >
        Reset to Zero
      </button>
    </div>
  );
}

function App() {
  // Single source of truth: state and dispatch
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div className="App" style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Single Source of Truth with useReducer</h1>
      <p>
        All components share the same state from one useReducer.
        <br />
        State is passed down as props - components stay in sync.
      </p>

      <CountDisplay count={state.count} />
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <CountControls dispatch={dispatch} />
        <CountStatus count={state.count} />
      </div>

      <ResetButton dispatch={dispatch} count={state.count} />

      <div style={{ marginTop: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
        <h4>Single Source of Truth:</h4>
        <pre style={{ fontSize: '12px' }}>{JSON.stringify(state, null, 2)}</pre>
        <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
          ✓ All 4 components share this one state
          <br />
          ✓ Updates through dispatch keep everyone in sync
          <br />
          ✓ No duplicate state or prop drilling complexity
        </p>
      </div>
    </div>
  );
}

export default App;
