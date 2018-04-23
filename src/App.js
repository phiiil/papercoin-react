import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Book from './book.js'
import CssBaseline from 'material-ui/CssBaseline';

class App extends Component {
  render() {
    return (
      <React.Fragment>
      <CssBaseline />

        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Papercoin</h1>
          </header>

          <Book />

        </div>
      </React.Fragment>
    );
  }
}

export default App;
