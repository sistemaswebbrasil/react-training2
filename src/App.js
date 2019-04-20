import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import { Switch, Route, Redirect } from "react-router-dom";

import AdminTemplate from "./template/adminTemplate";
import Home from "./pages/home";
import Users from "./pages/users";
import About from "./pages/about";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import PublicTemplate from "./template/publicTemplate";

function PrivateRoute({ component: Component, ...rest }) {
  const logged = true;
  return (
    <Route
      {...rest}
      render={props =>
        logged ? (
          <AdminTemplate>
            <Component {...props} />
          </AdminTemplate>
        ) : (
          <Redirect
            to={{
              pathname: "/login"
            }}
          />
        )
      }
    />
  );
}

function PublicRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => (
        <PublicTemplate>
          <Component {...props} />
        </PublicTemplate>
      )}
    />
  );
}

class App extends Component {
  state = {
    logged: true
  };

  render() {
    return (
      <div>
        <Switch>
          <PublicRoute path="/login" exact component={Login} />
          <PublicRoute path="/sign-up" exact component={SignUp} />
          <PrivateRoute path="/" exact component={Home} />
          <PrivateRoute path="/about/" component={About} />
          <PrivateRoute path="/users/" component={Users} />
        </Switch>
      </div>
    );
  }
}

export default App;
