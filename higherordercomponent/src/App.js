import React from 'react';

//component
const HelloWorld = ({message}) => {
  return <h1>{message}</h1>;
};

//component2
const GoodbyeWorld = ({farewellMessage}) => {
  return <h2>{farewellMessage}</h2>;
}

//Definition Component
const DefHoc = ({message}) => {
  return <p>{message}</p>;
}


//HOC
const withDefaultMessage = (WrappedComponent, message="Hello, World!", farewellMessage="Goodbye, World!") => {
  return (props) => {
    return <WrappedComponent {...props} message={message} farewellMessage={farewellMessage} />;
  };
};

//Usage of HOC Definition
const withDefHoc = (WrappedComponent, message) => {
  return (props) => {
    return <WrappedComponent {...props} message={message} />;
  };
};

//Enhanced Component using HOC
const EnhancedHelloWorld = withDefaultMessage(HelloWorld , "Welcome to the HOC Example!");
const EnhancedGoodbyeWorld = withDefaultMessage(GoodbyeWorld , "See you later!");
const EnhancedDefComponent = withDefHoc(DefHoc, "HOC est une fonction qui prend un composant en entrée et renvoie un nouveau composant avec des fonctionnalités supplémentaires.");
//App Component
function App() {
  return (
    <div className="App">
      <EnhancedHelloWorld />
      <EnhancedGoodbyeWorld />
      <EnhancedDefComponent />
    </div>
  );
}
export default App;