import React from 'react';
import './App.css';
import ErrorBoundary from './ErrorBoundary';
import BuggyComponent from './BuggyComponent';

function App() {
  return (
    <div className="App" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>
        React Error Boundary Example
      </h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
        This demonstrates how Error Boundaries catch and display errors gracefully
      </p>


      {/* Component wrapped with Error Boundary */}
      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>

      {/* This section will remain functional even if the above crashes */}
      <div style={{
        padding: '20px',
        margin: '20px',
        border: '2px solid #51cf66',
        borderRadius: '8px',
        backgroundColor: '#d3f9d8'
      }}>
        <h2 style={{ color: '#2b8a3e' }}>✓ Safe Component</h2>
        <p style={{ color: '#495057' }}>
          This component is outside the Error Boundary and will continue to work
          even if the component above crashes.
        </p>
      </div>
    </div>
  );
}

export default App;
