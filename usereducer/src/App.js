import { useReducer } from 'react';
import './App.css';

// Reducer function
function todoReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, { id: Date.now(), text: action.payload, completed: false }];
    case 'toggle':
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case 'remove':
      return state.filter(todo => todo.id !== action.payload);
    case 'clear':
      return [];
    default:
      return state;
  }
}

// Custom hook: Single source of truth with reusable logic
function useTodos() {
  const [todos, dispatch] = useReducer(todoReducer, []);

  // Helper functions - encapsulate logic
  const addTodo = (text) => {
    if (text.trim()) {
      dispatch({ type: 'add', payload: text });
    }
  };

  const toggleTodo = (id) => {
    dispatch({ type: 'toggle', payload: id });
  };

  const removeTodo = (id) => {
    dispatch({ type: 'remove', payload: id });
  };

  const clearTodos = () => {
    dispatch({ type: 'clear' });
  };

  // Computed values
  const totalCount = todos.length;
  const completedCount = todos.filter(t => t.completed).length;
  const pendingCount = totalCount - completedCount;

  return {
    todos,
    addTodo,
    toggleTodo,
    removeTodo,
    clearTodos,
    totalCount,
    completedCount,
    pendingCount
  };
}

// Component 1: Add todo form
function TodoInput({ onAdd }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(e.target.todo.value);
    e.target.reset();
  };

  return (
    <div style={{ padding: '20px', border: '2px solid #61dafb', margin: '10px' }}>
      <h3>Add Todo</h3>
      <form onSubmit={handleSubmit}>
        <input 
          name="todo"
          placeholder="Enter todo..."
          style={{ padding: '8px', width: '200px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>Add</button>
      </form>
    </div>
  );
}

// Component 2: Todo list
function TodoList({ todos, onToggle, onRemove }) {
  return (
    <div style={{ padding: '20px', border: '2px solid #51cf66', margin: '10px' }}>
      <h3>Todo List</h3>
      {todos.length === 0 ? (
        <p>No todos yet</p>
      ) : (
        todos.map(todo => (
          <div key={todo.id} style={{ padding: '8px', margin: '5px 0', background: '#f8f9fa' }}>
            <input 
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
            />
            <span style={{ 
              marginLeft: '10px',
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? '#999' : '#000'
            }}>
              {todo.text}
            </span>
            <button 
              onClick={() => onRemove(todo.id)}
              style={{ float: 'right', padding: '3px 8px', background: '#ff6b6b', color: 'white' }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

// Component 3: Statistics
function TodoStats({ totalCount, completedCount, pendingCount }) {
  return (
    <div style={{ padding: '20px', border: '2px solid #ffd43b', margin: '10px' }}>
      <h3>Statistics</h3>
      <p>Total: <strong>{totalCount}</strong></p>
      <p>Completed: <strong style={{ color: '#51cf66' }}>{completedCount}</strong></p>
      <p>Pending: <strong style={{ color: '#ff6b6b' }}>{pendingCount}</strong></p>
    </div>
  );
}

// Component 4: Actions
function TodoActions({ onClear, hasItems }) {
  return (
    <div style={{ padding: '20px', border: '2px solid #a78bfa', margin: '10px' }}>
      <h3>Actions</h3>
      <button 
        onClick={onClear}
        disabled={!hasItems}
        style={{ 
          padding: '10px 20px',
          background: hasItems ? '#ff6b6b' : '#ccc',
          color: 'white'
        }}
      >
        Clear All Todos
      </button>
    </div>
  );
}

function App() {
  // Custom hook provides single source of truth
  const { 
    todos, 
    addTodo, 
    toggleTodo, 
    removeTodo, 
    clearTodos,
    totalCount,
    completedCount,
    pendingCount
  } = useTodos();

  return (
    <div className="App" style={{ padding: '40px', maxWidth: '700px', margin: '0 auto' }}>
      <h1>Single Source of Truth with Custom Hook</h1>
      <p>
        All state and logic is encapsulated in <code>useTodos()</code> hook.
        <br />
        Components receive only what they need - clean separation!
      </p>

      <TodoInput onAdd={addTodo} />

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }}>
        <TodoList todos={todos} onToggle={toggleTodo} onRemove={removeTodo} />
        <div>
          <TodoStats 
            totalCount={totalCount} 
            completedCount={completedCount} 
            pendingCount={pendingCount}
          />
          <TodoActions onClear={clearTodos} hasItems={totalCount > 0} />
        </div>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
        <h4>Single Source of Truth (from useTodos hook):</h4>
        <pre style={{ fontSize: '12px' }}>{JSON.stringify(todos, null, 2)}</pre>
        <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
          ✓ All state managed by useReducer inside custom hook
          <br />
          ✓ Business logic encapsulated in hook
          <br />
          ✓ Components stay clean and focused
          <br />
          ✓ Hook can be reused across app
        </p>
      </div>
    </div>
  );
}

export default App;
