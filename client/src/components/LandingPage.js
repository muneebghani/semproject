import {
  Button,
  makeStyles,
  Grid,
  Zoom,
  Container,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import Bckgrnd from "../backgroundimg/landingpagephoto.jpg";
import SingleProduct from "./products/SingleProduct";
import axios from "axios";
import { toast } from "react-toastify";
import { Slide } from "react-toastify";
import LinearProgress from "@material-ui/core/LinearProgress";
import Products from "./products/Products";

const useStyles = makeStyles((theme) => ({
  t1: {
    color: "white",
    fontSize: "4.5rem",
  },
  t2: {
    color: "rgb(205, 112, 0)",
    fontSize: "4.5rem",
  },
  btn: {
    "&:hover": {
      backgroundColor: "rgb(205, 112, 0)",
    },
    fontSize: "1.6rem",
    color: "floralwhite",
    border: "0.2rem solid rgb(205, 112, 0)",
  },
  bckgrnd: {
    minHeight: "calc(100vh - 64px)",
    backgroundImage: `url(${Bckgrnd})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    position: "relative",
    marginLeft: theme.spacing(-3),
    marginRight: theme.spacing(-3),
  },
  golden: {
    color: "rgb(205, 112, 0)",
  },
}));
const LandingPage = () => {
  const [topprods, setTopprods] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const getTopProdsData = () => {
    axios
      .get("http://localhost:4000/api/products/getTopProds")
      .then((res) => {
        setTopprods(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // getData();
  React.useEffect(getTopProdsData, []);
  const classes = useStyles();
  return (
    <>
      <div>
        <div className={classes.bckgrnd}>
          <Typography
            style={{
              textTransform: "capitalize",
              color: "white",
              fontSize: "3.8rem",
              top: "13%",
              left: "10%",
              zIndex: "1000",
              position: "absolute",
            }}
          >
            <br />
            <span className={classes.t1}>pro</span>
            <span className={classes.t2}>Shop</span>
          </Typography>
          <br />
          <Button
            className={classes.btn}
            style={{ position: "absolute", top: "45%", left: "10%" }}
          >
            <Link
              to="./products"
              style={{ textDecoration: "none", color: "floralwhite" }}
            >
              explore
            </Link>
          </Button>
        </div>
      </div>
      <br />
      <br />
      <Grid container justify="center">
        <h1 style={{ textAlign: "center" }}>
          Top <span className={classes.golden}>Selling Products</span>
        </h1>
        {loading ? (
          <LinearProgress />
        ) : topprods.length === 0 ? (
          toast.error("Error: Products not found", {
            position: toast.POSITION.BOTTOM_CENTER,
            toastId: "",
            transition: Slide,
          })
        ) : (
          <Container>
            <Zoom in>
              <Grid container spacing={6}>
                {topprods.map((p, idx) => (
                  <SingleProduct key={idx} product={p} />
                ))}
              </Grid>
            </Zoom>
          </Container>
        )}
        <div style={{ marginTop: "3.5rem" }}>
          <Products />
        </div>
      </Grid>
    </>
  );
};

export default LandingPage;
