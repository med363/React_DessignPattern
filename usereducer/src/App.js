import { useReducer, useContext, createContext } from 'react';
import './App.css';

// Single source of truth: Context for global state
const AppContext = createContext();

// Reducer manages all state in one place
function appReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'ADD_NOTIFICATION':
      return { 
        ...state, 
        notifications: [...state.notifications, action.payload] 
      };
    case 'CLEAR_NOTIFICATIONS':
      return { ...state, notifications: [] };
    default:
      return state;
  }
}

// Provider component wraps the app
function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, {
    user: null,
    theme: 'light',
    notifications: []
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the context
function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}

// Header component - accesses global state
function Header() {
  const { state, dispatch } = useApp();

  return (
    <div style={{ 
      padding: '20px', 
      background: state.theme === 'light' ? '#61dafb' : '#282c34',
      color: state.theme === 'light' ? '#000' : '#fff'
    }}>
      <h2>Header</h2>
      {state.user ? (
        <div>
          <span>Welcome, {state.user}! </span>
          <button onClick={() => dispatch({ type: 'LOGOUT' })}>Logout</button>
        </div>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  );
}

// Sidebar component - accesses global state
function Sidebar() {
  const { state, dispatch } = useApp();

  return (
    <div style={{ 
      padding: '20px', 
      background: state.theme === 'light' ? '#f0f0f0' : '#1a1a1a',
      color: state.theme === 'light' ? '#000' : '#fff',
      minHeight: '200px'
    }}>
      <h3>Sidebar</h3>
      <p>Theme: {state.theme}</p>
      <button onClick={() => dispatch({ 
        type: 'SET_THEME', 
        payload: state.theme === 'light' ? 'dark' : 'light' 
      })}>
        Toggle Theme
      </button>
    </div>
  );
}

// Login component - updates global state
function LoginForm() {
  const { dispatch } = useApp();

  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    dispatch({ type: 'SET_USER', payload: username });
    dispatch({ 
      type: 'ADD_NOTIFICATION', 
      payload: `${username} logged in successfully!` 
    });
  };

  return (
    <div style={{ padding: '20px', border: '2px solid #61dafb', margin: '20px' }}>
      <h3>Login</h3>
      <form onSubmit={handleLogin}>
        <input 
          name="username"
          placeholder="Enter username"
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>Login</button>
      </form>
    </div>
  );
}

// Notifications component - accesses global state
function Notifications() {
  const { state, dispatch } = useApp();

  return (
    <div style={{ padding: '20px', border: '2px solid #51cf66', margin: '20px' }}>
      <h3>Notifications ({state.notifications.length})</h3>
      {state.notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        <>
          {state.notifications.map((notif, index) => (
            <div key={index} style={{ padding: '8px', background: '#d4edda', margin: '5px 0' }}>
              {notif}
            </div>
          ))}
          <button 
            onClick={() => dispatch({ type: 'CLEAR_NOTIFICATIONS' })}
            style={{ marginTop: '10px', padding: '5px 10px' }}
          >
            Clear All
          </button>
        </>
      )}
    </div>
  );
}

// Main content
function MainContent() {
  const { state } = useApp();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Single Source of Truth</h1>
      <p>useReducer + useContext = Global State Management</p>
      
      {!state.user && <LoginForm />}
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
        <Sidebar />
        <Notifications />
      </div>

      <div style={{ marginTop: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
        <h4>Global State (Single Source of Truth):</h4>
        <pre style={{ fontSize: '12px' }}>{JSON.stringify(state, null, 2)}</pre>
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <Header />
      <MainContent />
    </AppProvider>
  );
}

export default App;
