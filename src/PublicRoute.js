import React from "react";
import { Route } from "react-router-dom";
import PublicTemplate from "./template/publicTemplate";

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

export default PublicRoute;
