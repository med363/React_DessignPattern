import React, { useState } from 'react';

// ============================================
// STEP 1: Simple Component (without logic)
// ============================================
const Button = ({ text, color }) => {
  return (
    <button style={{ backgroundColor: color, padding: '10px 20px', margin: '5px' }}>
      {text}
    </button>
  );
};


// ============================================
// STEP 2: HOC that adds logic (counter)
// ============================================
// This HOC encapsulates the counter logic
const withCounter = (WrappedComponent) => {
  return (props) => {
    // Logic encapsulated in HOC
    const [count, setCount] = useState(0);

    const handleClick = () => {
      setCount(count + 1);
    };

    // Pass the logic to the component
    return (
      <div onClick={handleClick}>
        <WrappedComponent {...props} text={`Clicked ${count} times`} />
      </div>
    );
  };
};


// ============================================
// STEP 3: HOC that adds border styling logic
// ============================================
const withBorder = (WrappedComponent) => {
  return (props) => {
    return (
      <div style={{ border: '3px solid black', padding: '10px', display: 'inline-block' }}>
        <WrappedComponent {...props} />
      </div>
    );
  };
};


// ============================================
// STEP 4: Create enhanced components
// ============================================
// Button with counter logic
const ButtonWithCounter = withCounter(Button);

// Button with counter AND border logic
const ButtonWithCounterAndBorder = withBorder(withCounter(Button));


// ============================================
// App Component
// ============================================
function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Simple HOC Example</h1>

      <div style={{ marginBottom: '30px' }}>
        <h2>1. Original Button (no logic)</h2>
        <Button text="I'm a simple button" color="lightblue" />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>2. Button + Counter Logic (HOC)</h2>
        <ButtonWithCounter color="lightgreen" />
        <p>👆 Click the button - the HOC adds counter logic!</p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>3. Button + Counter + Border (Multiple HOCs)</h2>
        <ButtonWithCounterAndBorder color="lightyellow" />
        <p>👆 This button has TWO HOCs: counter logic + border styling!</p>
      </div>

      <div style={{ backgroundColor: '#f0f0f0', padding: '15px', marginTop: '30px' }}>
        <h3>💡 Key Concept:</h3>
        <p><strong>Without HOC:</strong> You write counter logic inside each component</p>
        <p><strong>With HOC:</strong> You write counter logic ONCE, then wrap any component to add that logic!</p>
      </div>
    </div>
  );
}

export default App;