import React from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import './book.css';
import DataTables from 'material-ui-datatables';
import _ from 'lodash'
import CustomizedTable from './table.js'

const DISPLAY_DEPTH = 5;

const TABLE_COLUMNS = [
  {
    key: 'name',
    label: 'Dessert (100g serving)',
  }, {
    key: 'calories',
    label: 'Calories',
  }
];

const TABLE_DATA = [
  {
    name: 'Frozen yogurt',
    calories: '159',
    fat: '6.0',
    carbs: '24'
  }, {
    name: 'Ice cream sandwich',
    calories: '159',
    fat: '6.0',
    carbs: '24'
  }
];

/**
 * Component to fetch book from API call and display current bids and asks.
 */
export default class Book extends React.Component {



  constructor(props) {
    super(props);
    this.api = "https://api.quadrigacx.com/v2/order_book";
    this.state = {book: []};
  }

  componentDidMount() {
    this.fetchBook();
  }

  fetchBook() {
    console.log('fetching book...')
    fetch(this.api)
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
      var bidSizeCAD = i.bidSizeBTC * i.bidPriceCAD;
      var askSizeCAD = i.askSizeBTC * i.askPriceCAD
      return {
        bidSizeCAD,
        askSizeCAD,
        ...i
      }
    });
    this.setState({ book: newBook });
  }

  render() {
    console.log(this.state.book);
    return (
      <CustomizedTable data={this.state.book} />
    );
  }
}
