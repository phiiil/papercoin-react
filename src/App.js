import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Book from './book.js'
import CustomizedTable from './table.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'; // add
import CssBaseline from 'material-ui/CssBaseline';
import Button from 'material-ui/Button';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
      <React.Fragment>
      <CssBaseline />

        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Papercoin</h1>
          </header>

          <Button label="Material UI" > Label </Button>

          <Book />


        </div>
      </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default App;
