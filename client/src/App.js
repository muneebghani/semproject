import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import LandingPage from "./components/LandingPage";
import Products from "./components/products/Products";
import ContactUs from "./components/ContactUs";
import NotFound from "./components/NotFound";
import { Container } from "@material-ui/core";
import ProductDetail from "./components/products/ProductDetail";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import AddProduct from "./components/admin/AddProduct";
import Dashboard from "./components/admin/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditProduct from "./components/admin/EditProduct";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <ToastContainer />
        <Container>
          <Switch>
            <Route exact path="/products/edit/:id" component={EditProduct} />
            <Route exact path="/products/add" component={AddProduct} />
            <Route path="/admin/dashboard" component={Dashboard} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/products/:id" component={ProductDetail} />
            <Route path="/contactus" exact component={ContactUs} />
            <Route path="/products" component={Products} />
            <Route path="/404-page-not-found" component={NotFound} />
            <Route path="/" exact component={LandingPage} />
            <Redirect to="/404-page-not-found" />
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
