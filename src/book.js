import React from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import './book.css';
import PropTypes from 'prop-types';
import DataTables from 'material-ui-datatables';
import CustomizedTable from './table.js'



/**
 * Component to fetch book from API call and display current bids and asks.
 */
export default class Book extends React.Component {

  render() {
    const {bookData} = this.props;

    console.log(bookData);

    return (
      <CustomizedTable data={bookData} />
    );
  }
}

Book.propTypes = {
  bookData: PropTypes.array.isRequired,
};
