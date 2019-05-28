import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import AdminTemplate from "./template/adminTemplate";

function PrivateRoute({ component: Component, login, ...rest }) {
  return (
    <>
      {!login.requesting && (
        <Route
          {...rest}
          render={props =>
            login.user ? (
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
      )}
    </>
  );
}

const mapStateToProps = state => {
  return {
    login: state.login
  };
};

export default connect(mapStateToProps)(PrivateRoute);
