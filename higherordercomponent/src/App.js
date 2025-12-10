import React, { useState } from 'react';

// ============================================
// PROBLEM: Without HOC - Duplicate Logic
// ============================================

// Component 1: Counter button
const CounterButton = () => {
  const [count, setCount] = useState(0); // 😫 Same logic repeated

  return (
    <button onClick={() => setCount(count + 1)} style={{ padding: '10px', margin: '5px' }}>
      Button clicked {count} times
    </button>
  );
};

// Component 2: Counter text
const CounterText = () => {
  const [count, setCount] = useState(0); // 😫 Same logic repeated again!

  return (
    <div onClick={() => setCount(count + 1)} style={{ border: '1px solid blue', padding: '10px', cursor: 'pointer' }}>
      Click me! Count: {count}
    </div>
  );
};

// Component 3: Counter heading
const CounterHeading = () => {
  const [count, setCount] = useState(0); // 😫 Same logic repeated AGAIN!

  return (
    <h2 onClick={() => setCount(count + 1)} style={{ color: 'green', cursor: 'pointer' }}>
      Heading Clicks: {count}
    </h2>
  );
};


// ============================================
// SOLUTION: With HOC - Reuse Logic Once!
// ============================================

// 🎯 Write the counter logic ONCE in a HOC
const withCounter = (WrappedComponent) => {
  return (props) => {
    // The reusable logic is HERE
    const [count, setCount] = useState(0);
    const increment = () => setCount(count + 1);

    // Pass the logic to ANY component
    return <WrappedComponent {...props} count={count} increment={increment} />;
  };
};


// ============================================
// Simple Components (NO logic inside)
// ============================================

const SimpleButton = ({ count, increment }) => {
  return (
    <button onClick={increment} style={{ padding: '10px', margin: '5px', backgroundColor: 'lightblue' }}>
      Button clicked {count} times
    </button>
  );
};

const SimpleText = ({ count, increment }) => {
  return (
    <div onClick={increment} style={{ border: '2px solid purple', padding: '10px', cursor: 'pointer' }}>
      Click me! Count: {count}
    </div>
  );
};

const SimpleHeading = ({ count, increment }) => {
  return (
    <h2 onClick={increment} style={{ color: 'orange', cursor: 'pointer' }}>
      Heading Clicks: {count}
    </h2>
  );
};

const SimpleCard = ({ count, increment, title }) => {
  return (
    <div onClick={increment} style={{ border: '1px solid gray', padding: '15px', margin: '10px', borderRadius: '8px', cursor: 'pointer' }}>
      <h3>{title}</h3>
      <p>You clicked this card {count} times!</p>
    </div>
  );
};


// ============================================
// Apply HOC to add counter logic
// ============================================

const ButtonWithCounter = withCounter(SimpleButton);
const TextWithCounter = withCounter(SimpleText);
const HeadingWithCounter = withCounter(SimpleHeading);
const CardWithCounter = withCounter(SimpleCard);


// ============================================
// App Component
// ============================================

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🎯 HOC: Reusing Logic Example</h1>

      {/* ❌ WITHOUT HOC */}
      <div style={{ backgroundColor: '#ffe6e6', padding: '20px', marginBottom: '30px', borderRadius: '8px' }}>
        <h2>❌ WITHOUT HOC (Duplicate Logic)</h2>
        <p>Each component has the SAME counter logic repeated inside 😫</p>
        <CounterButton />
        <CounterText />
        <CounterHeading />
        <p style={{ color: 'red', fontWeight: 'bold' }}>
          Problem: If you want to change the counter logic, you must edit 3 places!
        </p>
      </div>

      {/* ✅ WITH HOC */}
      <div style={{ backgroundColor: '#e6ffe6', padding: '20px', borderRadius: '8px' }}>
        <h2>✅ WITH HOC (Reused Logic)</h2>
        <p>All components share the SAME counter logic from the HOC 🎉</p>
        <ButtonWithCounter />
        <TextWithCounter />
        <HeadingWithCounter />
        <CardWithCounter title="Card Example" />
        <p style={{ color: 'green', fontWeight: 'bold' }}>
          Benefit: Counter logic is in ONE place. Easy to maintain and reuse!
        </p>
      </div>

      {/* 💡 KEY CONCEPT */}
      <div style={{ backgroundColor: '#fff3cd', padding: '20px', marginTop: '30px', borderRadius: '8px' }}>
        <h2>💡 Key Concept: Logic Reusability</h2>
        <ol style={{ lineHeight: '2' }}>
          <li><strong>Without HOC:</strong> Copy-paste logic in every component 🔄</li>
          <li><strong>With HOC:</strong> Write logic once, wrap any component with it ✨</li>
          <li><strong>Result:</strong> Same behavior, less code, easier maintenance! 🚀</li>
        </ol>
        <div style={{ backgroundColor: 'white', padding: '15px', marginTop: '10px', borderLeft: '4px solid orange' }}>
          <code>
            withCounter(AnyComponent) → AnyComponent gets counter logic automatically!
          </code>
        </div>
      </div>
    </div>
  );
}

export default App;