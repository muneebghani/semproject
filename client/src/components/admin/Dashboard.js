import React from "react";
import TableList from "./TableList";
import axios from "axios";
import { Container, Grid, Grow } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Slide, toast } from "react-toastify";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withRouter } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  golden: {
    color: "rgb(205, 112, 0)",
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
  },
}));

const Dashboard = (props) => {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  console.log(props.match.params.id);
  const classes = useStyles();

  const getData = () => {
    axios
      .get("http://localhost:4000/api/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(getData, []);
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        List Of <span className={classes.golden}>Products</span>
      </h1>
      {loading ? (
        <CircularProgress />
      ) : products.length === 0 ? (
        toast.error("Error: Couldn't fetch products", {
          position: toast.POSITION.TOP_CENTER,
          toastId: "",
          transition: Slide,
        })
      ) : (
        <Container>
          <Grow in>
            <Grid container spacing={4}>
              {products.map((product, index) => (
                <TableList
                  key={index}
                  product={product}
                  history={props.history}
                  onDelete={getData}
                />
              ))}
            </Grid>
          </Grow>
        </Container>
      )}
    </div>
  );
};

export default withRouter(Dashboard);
