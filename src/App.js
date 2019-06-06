import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import { Switch } from "react-router-dom";
import { connect } from "react-redux";

import Home from "./pages/home";
import Users from "./pages/users";
import About from "./pages/about";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import { isAuthenticated } from "./pages/login/actions";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import UserForm from "./pages/users/UserForm";

class App extends Component {
  constructor(props) {
    super(props);

    this.props.isAuthenticated();
  }

  render() {
    return (
      <div>
        <Switch>
          <PublicRoute path="/login" exact component={Login} />
          <PublicRoute path="/sign-up" exact component={SignUp} />
          <PrivateRoute path="/" exact component={Home} />
          <PrivateRoute path="/about/" component={About} />
          <PrivateRoute path="/users/" exact component={Users} />
          <PrivateRoute path="/users/:id/edit" component={UserForm} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state.login
  };
};

const mapDispatchToProps = {
  isAuthenticated
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
