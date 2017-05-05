import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Cart from './components/cart';
import Todo from './components/todo';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to dockerized board</h2>
        </div>
        <div className="App-intro">
          <Todo />
        </div>
        <div className="App-intro">
          <Cart />
        </div>
      </div>
    );
  }
}

export default App;
