import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Book from './book.js'
import CustomizedTable from './table.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'; // add
import CssBaseline from 'material-ui/CssBaseline';
import Button from 'material-ui/Button';
import FileUpload from '@material-ui/icons/FileUpload';
import { FormGroup, FormLabel, FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import Grid from 'material-ui/Grid';
import _ from 'lodash'


const API_URL = "https://api.quadrigacx.com/v2/order_book";
const DISPLAY_DEPTH = 5;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {book: [], loading: true};
    // button bindings
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  fetchBook() {
    this.setState({loading: true});
    console.log('fetching book...')
    fetch(API_URL)
      .then((response) => {
        console.log('received book...');
        return response.json();
      })
      .then( (responseJson) => {
        console.log(responseJson)
        this.setBookData(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  /**
   * Convert book data into format for diaplay
   */
  setBookData(rawBook) {
    // top bids
    var topBids = rawBook.bids.slice(0, DISPLAY_DEPTH);
    var topAsks = rawBook.asks.slice(0, DISPLAY_DEPTH);
    var bidAsks = _.zip(topBids, topAsks);
    console.log(bidAsks);
    var newBook = bidAsks.map((item) => {
      return {
        bidSizeBTC: item[0][1],
        bidPriceCAD: item[0][0],
        askSizeBTC: item[1][1],
        askPriceCAD: item[1][0],
      }
    });
    newBook = newBook.map((i) => {
      // calculate CAD sizes (more human readable)
      var bidSizeCAD = i.bidSizeBTC * i.bidPriceCAD;
      var askSizeCAD = i.askSizeBTC * i.askPriceCAD
      return {
        bidSizeCAD,
        askSizeCAD,
        ...i
      }
    });
    this.setState({ book: newBook, loading: false});
  }

  componentDidMount() {
    this.fetchBook();
  }

  handleRefresh() {
    this.fetchBook();
  }


  render() {
    console.log('App Render');
    console.log(this.state.book);
    return (
      <MuiThemeProvider>
      <React.Fragment>
      <CssBaseline />

        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Papercoin</h1>
          </header>
          <Grid container row xs={12} spacing={16} justify={"center"}>
            <Grid item>
              <Button  variant="raised" color="action" onClick={this.handleRefresh}>
                { this.state.loading ? "Loading..." : "Refresh"}
                <FileUpload />
              </Button>
            </Grid>
            <Grid item>
              <p> 5 </p>
            </Grid>
            <Grid item>
              <FormControlLabel control={
                <Switch value="fullBook" color="default" />
              } label="Full" />
            </Grid>
          </Grid>

          <Book bookData={this.state.book} />

        </div>

      </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default App;
