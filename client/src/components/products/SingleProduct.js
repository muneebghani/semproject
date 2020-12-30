import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles({
  card: {
    maxWidth: 550,
  },
  media: {
    height: 220,
    position: "relative",
    overflow: "hidden",
    transition: "all 1s ease-in-out",
    "&:hover": {
      transform: "scale(1.02)",
    },
  },
  goldencarticon: {
    "&:hover": {
      transform: "scale(1.3)",
    },
    color: "rgb(205, 112, 0)",
    transition: "all 1s ease-in-out",
    fontSize: "26px",
  },
});

const SingleProduct = (props) => {
  const { product, history } = props;
  const classes = useStyles();
  let [value, setValue] = React.useState(0);
  return (
    <Grid item md={4} xs={12}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={product.image}
            title="Product"
            onClick={(e) => {
              history.push("/products/" + product._id);
            }}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h4"
              component="h2"
              onClick={(e) => {
                history.push("/products/" + product._id);
              }}
            >
              {product.instrument}
            </Typography>
            <Typography
              variant="h5"
              color="textSecondary"
              component="p"
              onClick={(e) => {
                history.push("/products/" + product._id);
              }}
            >
              Rs. {product.price}
            </Typography>
            <Typography variant="body1">
              <Rating
                name="simple-controlled"
                value={product.rating}
                onChange={(e) => {
                  setValue(value);
                }}
              />
            </Typography>
          </CardContent>
        </CardActionArea>
        <Grid container spacing={0}>
          <CardActions
            style={{ width: "100%", justifyContent: "space-between" }}
          >
            {product.quantity > 0 ? (
              <Typography variant="h5" color="inherit">
                Remaining Quantity: {product.quantity}
              </Typography>
            ) : (
              <Typography variant="h5" color="error">
                Out of stock
              </Typography>
            )}
            <Button size="large" color="primary">
              <AddShoppingCartIcon className={classes.goldencarticon} />
            </Button>
          </CardActions>
        </Grid>
      </Card>
    </Grid>
  );
};

export default withRouter(SingleProduct);
