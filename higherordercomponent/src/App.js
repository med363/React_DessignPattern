import React from 'react';

//component
const HelloWorld = ({message}) => {
  return <h1>{message}</h1>;
};


//HOC
const withDefaultMessage = (WrappedComponent, message="Hello, World!") => {
  return (props) => {
    return <WrappedComponent {...props} message={message} />;
  };
};
//Enhanced Component using HOC
const EnhancedHelloWorld = withDefaultMessage(HelloWorld , "Welcome to the HOC Example!");

//App Component
function App() {
  return (
    <div className="App">
      <EnhancedHelloWorld />
    </div>
  );
}
export default App;