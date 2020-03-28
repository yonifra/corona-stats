import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import CountriesDropDown from './components/CountriesDropDown'
import React from 'react';
import logo from './resources/logo.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Please choose a country</p>
        <CountriesDropDown/>
      </header>
    </div>
  );
}

export default App;
