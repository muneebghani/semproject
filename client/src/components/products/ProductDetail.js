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
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
  },
  media: {
    height: 300,
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
  },
});

const ProductDetail = (props) => {
  const [product, setProduct] = React.useState([]);
  const id = props.match.params.id;
  React.useEffect(() => {
    axios
      .get("https://whispering-fjord-20541.herokuapp/api/products/" + id)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justify="start"
      style={{ minHeight: "90vh" }}
    >
      <Grid item xs={6}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={product.image}
              title="Product"
            />
            <CardContent
              style={{ width: "100%", justifyContent: "space-between" }}
            >
              <Typography gutterBottom variant="h2" component="h2">
                {product.instrument}
              </Typography>
              <Typography variant="h3" color="textSecondary" component="p">
                Rs. {product.price}
              </Typography>
            </CardContent>
          </CardActionArea>
          <Grid container spacing={0}>
            <CardActions
              style={{ width: "100%", justifyContent: "space-between" }}
            >
              <Typography variant="h5" color="inherit">
                Quantity: {product.quantity}
              </Typography>
              <Button size="large" color="primary">
                <AddShoppingCartIcon className={classes.goldencarticon} />
              </Button>
            </CardActions>
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h4">{product.description}</Typography>
      </Grid>
    </Grid>
  );
};

export default ProductDetail;
