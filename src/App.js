import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Book from './book.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Papercoin</h1>
        </header>

        <Book />

      </div>
    );
  }
}

export default App;
