import React from "react";
import { Grid } from "semantic-ui-react";

function ModalGrid({ children }) {
  return (
    <Grid textAlign="center" style={{ height: "100%" }} verticalAlign="middle">
      <Grid.Column>{children}</Grid.Column>
    </Grid>
  );
}

export default ModalGrid;
