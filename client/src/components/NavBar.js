import {
  AppBar,
  Button,
  CssBaseline,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import userService from "./services/UserService";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: "#D2691E",
    textDecoration: "none",
  },
  navbar: {
    backgroundColor: "rgba(0,0,0,0.95)",
  },
  custombtns: {
    textDecoration: "none",
    fontSize: "16px",
  },
  navbarbrand: {
    color: "white",
    textDecoration: "none",
  },
  customcolor: {
    color: "#D2691E",
  },
  customcolor2: {
    color: "floralwhite",
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };
  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            {userService.isAdmin() === true ? (
              <>
                <Button>
                  <Link
                    to="/admin/dashboard"
                    className={classes.custombtns}
                    style={{ color: "rgba(255, 255, 255, 0.5)" }}
                  >
                    Dashboard
                  </Link>
                </Button>
                <Button>
                  <Link
                    to="/products/add"
                    className={classes.custombtns}
                    style={{ color: "rgba(255, 255, 255, 0.5)" }}
                  >
                    Add Product
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMenu}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={() => setAnchorEl(false)}
                >
                  <MenuItem onClick={() => setAnchorEl(false)}>
                    <Typography variant="h6">
                      <Link to="/" className={classes.link}>
                        Home
                      </Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={() => setAnchorEl(false)}>
                    <Typography variant="h5">
                      <Link to="/about" className={classes.link}>
                        About
                      </Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={() => setAnchorEl(false)}>
                    <Typography variant="h5">
                      <Link to="/products" className={classes.link}>
                        Products
                      </Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={() => setAnchorEl(false)}>
                    <Typography variant="h5">
                      <Link to="/contactus" className={classes.link}>
                        Contact
                      </Link>
                    </Typography>
                  </MenuItem>
                </Menu>
                <Typography variant="h5">
                  <Link to="/" className={classes.navbarbrand}>
                    <span className={classes.customcolor2}>Pro</span>
                    <span className={classes.customcolor}>Shop</span>
                  </Link>
                </Typography>
                <Grid container justify="flex-end">
                  <IconButton
                    style={{ color: "rgba(255, 255, 255, 0.5)" }}
                    aria-label="add to shopping cart"
                  >
                    <AddShoppingCartIcon />
                  </IconButton>
                  {!userService.isLoggedIn() ? (
                    <>
                      <Button>
                        <Link
                          to="/login"
                          className={classes.custombtns}
                          style={{ color: "rgba(255, 255, 255, 0.5)" }}
                        >
                          Login
                        </Link>
                      </Button>
                      <Button>
                        <Link
                          to="/register"
                          className={classes.custombtns}
                          style={{ color: "rgba(255, 255, 255, 0.5)" }}
                        >
                          Register
                        </Link>
                      </Button>
                    </>
                  ) : (
                    <Button
                      className={classes.custombtns}
                      style={{ color: "rgba(255, 255, 255, 0.5)" }}
                      onClick={(e) => {
                        userService.logout();
                        window.location.reload();
                      }}
                    >
                      LogOut {userService.getLoggedInUser().name}
                    </Button>
                  )}
                </Grid>
              </>
            )}
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default NavBar;
