import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Typography } from "@material-ui/core";
import { Slide, toast } from "react-toastify";
import userService from "../services/UserService";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "400px",
  },
  child: {
    width: "38%",
  },
}));
const Login = (props) => {
  const classes = useStyles();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
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
        Login Form
      </Typography>
      <div className={classes.container}>
        <div className={classes.child}>
          <TextField
            label="Enter your Email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />{" "}
          <br />
          <br />
          <br />
          <TextField
            label="Enter your Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <br />
          <br />
          <br />
          <Button
            variant="outlined"
            size="large"
            onClick={(e) => {
              userService
                .login(email, password)
                .then((data) => {
                  console.log(data);
                  toast.success("Login Success", {
                    position: toast.POSITION.TOP_CENTER,
                    toastId: "",
                    transition: Slide,
                  });
                  window.location.href = "/";
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            Login
          </Button>
        </div>
      </div>
    </>
  );
};

export default Login;
