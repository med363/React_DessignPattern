import React from 'react';
import './App.css';
import ErrorBoundary from './ErrorBoundary';
import BuggyComponent from './BuggyComponent';

function App() {
  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Error Boundary Example</h1>
      
      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>
      
      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
        <h3>This component is safe</h3>
        <p>Even if the component above crashes, this one keeps working!</p>
      </div>
    </div>
  );
}

export default App;
