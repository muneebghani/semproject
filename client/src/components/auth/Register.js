import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Typography } from "@material-ui/core";
import userService from "../services/UserService";
import axios from "axios";
import { Slide, toast } from "react-toastify";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "450px",
  },
  child: {
    width: "40%",
  },
}));
const Register = (props) => {
  const classes = useStyles();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
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
        Register Form
      </Typography>
      <div className={classes.container}>
        <div className={classes.child}>
          <TextField
            label="Enter your name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />{" "}
          <br />
          <br />
          <br />
          <TextField
            label="Enter your email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />{" "}
          <br />
          <br />
          <br />
          <TextField
            label="Enter your password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
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
            onClick={(e) => {
              userService
                .register(name, email, password)
                .then((data) => {
                  console.log(data);
                  props.history.push("/login");
                  toast.success("Registered! You can now login to continue", {
                    position: toast.POSITION.TOP_CENTER,
                    toastId: "",
                    transition: Slide,
                  });
                })
                .catch((err) => {
                  console.log(err);
                  toast.error(err.response.data, {
                    position: toast.POSITION.TOP_LEFT,
                  });
                });
            }}
          >
            Register
          </Button>
        </div>
      </div>
    </>
  );
};

export default Register;
