import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import axios from "axios";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const TableList = (props) => {
  const { product, history, onDelete } = props;
  console.log(props);
  const classes = useStyles();
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Product Image</StyledTableCell>
              <StyledTableCell align="right">Product Name</StyledTableCell>
              <StyledTableCell align="right">
                Product Price&nbsp;(Rs)
              </StyledTableCell>
              <StyledTableCell align="right">Product Quantity</StyledTableCell>
              <StyledTableCell align="right">Product Rating</StyledTableCell>
              <StyledTableCell align="right">Action&nbsp;(1)</StyledTableCell>
              <StyledTableCell align="right">Action&nbsp;(2)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                {product.image}
              </StyledTableCell>
              <StyledTableCell align="right">
                {product.instrument}
              </StyledTableCell>
              <StyledTableCell align="right">{product.price}</StyledTableCell>
              <StyledTableCell align="right">
                {product.quantity}
              </StyledTableCell>
              <StyledTableCell align="right">{product.rating}</StyledTableCell>
              <StyledTableCell align="right">
                <Fab>
                  <EditIcon
                    color="primary"
                    onClick={(e) => {
                      history.push("/products/edit/" + product._id);
                    }}
                  />
                </Fab>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Fab>
                  <DeleteIcon
                    color="secondary"
                    onClick={(e) => {
                      axios
                        .delete(
                          "http://localhost:4000/api/products/" + product._id
                        )
                        .then((res) => {
                          console.log(res);
                          onDelete();
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                  />
                </Fab>
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Fab
        className={classes.fab}
        color="primary"
        onClick={() => {
          history.push("/products/add");
        }}
      >
        <AddIcon fontSize="large" />
      </Fab>
    </>
  );
};

export default TableList;
