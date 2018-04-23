import React from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import './book.css';
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
    this.UserList();
  }

  UserList() {
    console.log('fetching book...')
    fetch(this.api)
      .then((response) => {
        console.log('received book...');
        return response.json();
      })
      .then( (responseJson) => {
        console.log(responseJson)
        this.setState({ book: responseJson });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {

    const spacing = 8;
    console.log("book:");
    console.log(this.state.book);
    var bids, asks = [];
    var date = "";
    if (this.state.book && this.state.book.bids) {
       bids = this.state.book.bids.slice(0, 5).map((item, i) => (
         <Grid key={i} container alignItems="center" direction="row">
           <Paper className="paper" >{ item[1] } </Paper> <Paper className="paper" >{ item[0] } </Paper>
         </Grid>
      ));
      asks = this.state.book.asks.slice(0, 5).map((item, i) => (
        <Grid key={i} container alignItems="center" direction="row">
          <Paper className="paper" >{ item[0] } </Paper> <Paper className="paper" >{ item[1] } </Paper>
        </Grid>
     ));

     const timestamp = this.state.book.timestamp;
     date = new Date(timestamp * 1000);
    }


    return (
      <div id="layout-content" className="layout-content-wrapper" border={1}>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={4}>
            <div> Best Bid/Offer = </div>
            <div> Timestamp: {date.toString()} </div>
          </Grid>
          <Grid item xs={3}>
             <Grid container className="book-column" alignItems="center" direction="column"  justify="center" spacing={8}>
               <div className="book-panel">{ bids }</div>
             </Grid>
          </Grid>
          <Grid item xs={3}>
             <Grid container className="book-column" alignItems="center" direction="column"  justify="center" spacing={8}>
               <div className="book-panel">{ asks }</div>
             </Grid>
          </Grid>
          <Grid item xs={2}>
            <div> Empty </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
