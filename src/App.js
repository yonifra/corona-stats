import './App.css';

import React from 'react';
import logo from './resources/logo.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Corona Stats
        </p>
        <p>Please choose a country for stats:</p>
      </header>
    </div>
  );
}

export default App;
