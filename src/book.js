import React from 'react';
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
    console.log("book:");
    console.log(this.state.book);
    var bids = [];
    if (this.state.book && this.state.book.bids) {
       bids = this.state.book.bids.map((item, i) => (
        <div>
          <span>{ item[0] } </span> <span> { item[1] }</span>
        </div>
      ));
    }

    return (
      <div id="layout-content" className="layout-content-wrapper">
        <div className="panel-list">{ bids }</div>
      </div>
    );
  }
}
