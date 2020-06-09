import React from 'react';
import logo from '../assets/images/logo.svg';
import './app.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <h1>Important!</h1>
        Here we have to inject the pages from pages folder <br/>
        In the pages we inject the components from components folder
      </header>
    </div>
  );
}

export default App;
