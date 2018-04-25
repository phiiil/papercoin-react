import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import NumberFormat from 'react-number-format';
import grey from 'material-ui/colors/grey';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 20,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 200,
  },
  centered: {
    textAlign: 'center',
    backgroundColor: grey[900],
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});


function CustomizedTable(props) {

  const { classes, data } = props;
  console.log(data);
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow >
            <CustomTableCell className={classes.centered} colSpan={3}>BID</CustomTableCell>
            <CustomTableCell className={classes.centered} colSpan={3}>ASK</CustomTableCell>
          </TableRow>
          <TableRow>
            <CustomTableCell numeric>Bid Size (CAD)</CustomTableCell>
            <CustomTableCell numeric>Bid Size (BTC)</CustomTableCell>
            <CustomTableCell numeric>Bid price (CAD)</CustomTableCell>
            <CustomTableCell numeric>Ask price (CAD)</CustomTableCell>
            <CustomTableCell numeric>Ask Size (BTC)</CustomTableCell>
            <CustomTableCell numeric>Ask Size (CAD)</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => {
            return (
              <TableRow className={classes.row} key={n.id}>
                <CustomTableCell numeric> <NumberFormat value={n.bidSizeCAD} decimalScale={2} fixedDecimalScale={true} displayType={'text'} thousandSeparator={true} prefix={'$'} /> </CustomTableCell>
                <CustomTableCell numeric>{n.bidSizeBTC}</CustomTableCell>
                <CustomTableCell numeric> <NumberFormat value={n.bidPriceCAD} decimalScale={2} fixedDecimalScale={true} displayType={'text'} thousandSeparator={true} prefix={'$'} /> </CustomTableCell>
                <CustomTableCell numeric> <NumberFormat value={n.askPriceCAD} decimalScale={2} fixedDecimalScale={true} displayType={'text'} thousandSeparator={true} prefix={'$'} /> </CustomTableCell>
                <CustomTableCell numeric>{n.askSizeBTC}</CustomTableCell>
                <CustomTableCell numeric> <NumberFormat value={n.askSizeCAD} decimalScale={2} fixedDecimalScale={true} displayType={'text'} thousandSeparator={true} prefix={'$'} /> </CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
};

export default withStyles(styles)(CustomizedTable);
