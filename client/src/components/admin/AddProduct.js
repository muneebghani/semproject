import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Typography } from "@material-ui/core";
import { Slide, toast } from "react-toastify";
import AttachmentIcon from "@material-ui/icons/Attachment";
import { useHistory } from "react-router-dom";

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

const AddProduct = (props) => {
  const classes = useStyles();
  const [instrument, setInstrument] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [rating, setRating] = React.useState();
  const [image, setImage] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [quantity, setQuantity] = React.useState(0);
  const [description, setDescription] = React.useState("");
  const history = useHistory();

  React.useEffect(() => {
    if (url) {
      fetch("http://localhost:8002/api/products", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: url,
          instrument,
          price,
          rating,
          quantity,
          description,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            <p>Error</p>;
          } else {
            toast.success("Product Added Successfully", {
              position: toast.POSITION.TOP_CENTER,
              toastId: "",
              transition: Slide,
            });
            history.push("/admin/dashboard");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error: Cannot Add Product", {
            position: toast.POSITION.TOP_CENTER,
            toastId: "",
            transition: Slide,
          });
        });
    }
  }, [url]);

  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "semproject");
    data.append("cloud_name", "dsbx0t4g3");
    fetch("https://api.cloudinary.com/v1_1/dsbx0t4g3/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        Add Product
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
          <div>
            <label htmlFor="upload-button"></label>
            <input
              id="upload-button"
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
            />
            <br />
          </div>
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
            onClick={() => postDetails()}
          >
            Add Product
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
