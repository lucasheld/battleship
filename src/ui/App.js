import React from 'react';
import './App.css';
import Identicon from 'react-identicons';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/*
        string is the seed for the random image
        */}
        <Identicon string={Math.random().toString(36).substring(7)} />
        <p>
          Edit <code>src/ui/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a style={{color: "red"}} >
          <h1>Important!</h1>
          Here we have to inject the pages from pages folder <br/>
          In the pages we inject the components from components folder
        </a>
      </header>
    </div>
  );
}

export default App;
