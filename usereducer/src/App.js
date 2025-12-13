import { useReducer } from 'react';
import './App.css';

// Reducer handles multiple action types
function formReducer(state, action) {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_AGE':
      return { ...state, age: action.payload };
    case 'TOGGLE_SUBSCRIBE':
      return { ...state, subscribe: !state.subscribe };
    case 'RESET':
      return { name: '', email: '', age: '', subscribe: false };
    case 'SUBMIT':
      return { ...state, submitted: true };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(formReducer, {
    name: '',
    email: '',
    age: '',
    subscribe: false,
    submitted: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT' });
  };

  return (
    <div className="App" style={{ padding: '40px', maxWidth: '500px', margin: '0 auto' }}>
      <h1>useReducer - Multiple Actions Example</h1>
      
      <form onSubmit={handleSubmit} style={{ border: '2px solid #61dafb', padding: '20px', borderRadius: '8px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label>Name:</label><br />
          <input 
            type="text"
            value={state.name}
            onChange={(e) => dispatch({ type: 'SET_NAME', payload: e.target.value })}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label><br />
          <input 
            type="email"
            value={state.email}
            onChange={(e) => dispatch({ type: 'SET_EMAIL', payload: e.target.value })}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Age:</label><br />
          <input 
            type="number"
            value={state.age}
            onChange={(e) => dispatch({ type: 'SET_AGE', payload: e.target.value })}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>
            <input 
              type="checkbox"
              checked={state.subscribe}
              onChange={() => dispatch({ type: 'TOGGLE_SUBSCRIBE' })}
            />
            {' '}Subscribe to newsletter
          </label>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" style={{ padding: '10px 20px' }}>Submit</button>
          <button 
            type="button" 
            onClick={() => dispatch({ type: 'RESET' })}
            style={{ padding: '10px 20px' }}
          >
            Reset
          </button>
        </div>
      </form>

      {state.submitted && (
        <div style={{ marginTop: '20px', padding: '20px', background: '#d4edda', borderRadius: '8px' }}>
          <h3>Form Submitted! ✅</h3>
          <p><strong>Name:</strong> {state.name}</p>
          <p><strong>Email:</strong> {state.email}</p>
          <p><strong>Age:</strong> {state.age}</p>
          <p><strong>Newsletter:</strong> {state.subscribe ? 'Yes' : 'No'}</p>
        </div>
      )}

      <div style={{ marginTop: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
        <h4>Current State:</h4>
        <pre style={{ fontSize: '12px' }}>{JSON.stringify(state, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
