import React from "react";
import SingleProduct from "./SingleProduct";
import axios from "axios";
import { Container, Grid, Grow } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Slide, toast } from "react-toastify";
import LinearProgress from "@material-ui/core/LinearProgress";
const useStyles = makeStyles((theme) => ({
  golden: {
    color: "rgb(205, 112, 0)",
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
  },
}));

const Products = () => {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const classes = useStyles();

  const getData = () => {
    axios
      .get("https://whispering-fjord-20541.herokuapp/api/products")
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
        Our <span className={classes.golden}>Products</span>
      </h1>
      {loading ? (
        <LinearProgress />
      ) : products.length === 0 ? (
        toast.error("Error: There are no products in DB", {
          position: toast.POSITION.TOP_CENTER,
          toastId: "",
          transition: Slide,
        })
      ) : (
        <Container>
          <Grow in>
            <Grid container spacing={6}>
              {products.map((product, index) => (
                <SingleProduct key={index} product={product} />
              ))}
            </Grid>
          </Grow>
        </Container>
      )}
    </div>
  );
};

export default Products;
