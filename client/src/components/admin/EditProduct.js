import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Typography } from "@material-ui/core";
import { Slide, toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "670px",
  },
  child: {
    width: "38%",
  },
}));

const EditProduct = (props) => {
  const classes = useStyles();
  const [instrument, setInstrument] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [rating, setRating] = React.useState();
  const [quantity, setQuantity] = React.useState(0);
  const [description, setDescription] = React.useState("");
  const history = useHistory();
  const id = props.match.params.id;

  React.useEffect(() => {
    axios
      .get("http://localhost:8002/api/products/" + id)
      .then((res) => {
        setInstrument(res.data.instrument);
        setPrice(res.data.price);
        setRating(res.data.rating);
        setQuantity(res.data.quantity);
        setDescription(res.data.description);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Typography
        variant="h3"
        color="textSecondary"
        style={{
          display: "flex",
          paddingTop: "10px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Edit Product
      </Typography>
      <div className={classes.container}>
        <div className={classes.child}>
          <TextField
            label="Product Name"
            variant="outlined"
            fullWidth
            value={instrument}
            onChange={(e) => {
              setInstrument(e.target.value);
            }}
          />{" "}
          <br />
          <br />
          <br />
          <TextField
            label="Product Price (Rs)"
            variant="outlined"
            fullWidth
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />{" "}
          <br />
          <br />
          <br />
          <TextField
            label="Product Quantity"
            variant="outlined"
            fullWidth
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />{" "}
          <br />
          <br />
          <br />
          <TextField
            label="Product Rating"
            variant="outlined"
            fullWidth
            value={rating}
            onChange={(e) => {
              setRating(e.target.value);
            }}
          />{" "}
          <br />
          <br />
          <br />
          <TextField
            label="Product Description"
            type="textarea"
            variant="outlined"
            fullWidth
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />{" "}
          <br />
          <br />
          <br />
          <br />
          <Button
            className={classes.btn}
            variant="outlined"
            size="large"
            onClick={() => {
              axios
                .put("http://localhost:4000/api/products/" + id, {
                  instrument,
                  price,
                  rating,
                  quantity,
                  description,
                })
                .then((res) => {
                  console.log(res.data);
                  toast.success("Product Edited Successfully", {
                    position: toast.POSITION.TOP_CENTER,
                    toastId: "",
                    transition: Slide,
                  });
                  history.push("/admin/dashboard");
                })
                .catch((err) => {
                  console.log(err);
                  toast.error("Error: Cannot Add Product", {
                    position: toast.POSITION.TOP_CENTER,
                    toastId: "",
                    transition: Slide,
                  });
                });
            }}
          >
            Edit Product
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
