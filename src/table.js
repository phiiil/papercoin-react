import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import NumberFormat from 'react-number-format';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
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
    minWidth: 400,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

/*
let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const data = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
*/

function CustomizedTable(props) {
  const { classes, data } = props;
  console.log(data);
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
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
