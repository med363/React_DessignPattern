import React from 'react';

//component
const HelloWorld = ({message}) => {
  return <h1>{message}</h1>;
};

//component2
const GoodbyeWorld = ({farewellMessage}) => {
  return <h2>{farewellMessage}</h2>;
}


//HOC
const withDefaultMessage = (WrappedComponent, message="Hello, World!", farewellMessage="Goodbye, World!") => {
  return (props) => {
    return <WrappedComponent {...props} message={message} farewellMessage={farewellMessage} />;
  };
};
//Enhanced Component using HOC
const EnhancedHelloWorld = withDefaultMessage(HelloWorld , "Welcome to the HOC Example!");
const EnhancedGoodbyeWorld = withDefaultMessage(GoodbyeWorld , "See you later!");

//App Component
function App() {
  return (
    <div className="App">
      <EnhancedHelloWorld />
      <EnhancedGoodbyeWorld />
    </div>
  );
}
export default App;