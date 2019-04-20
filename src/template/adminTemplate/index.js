import React from "react";
import { Container } from "semantic-ui-react";
import NavMenu from "./NavMenu";
import Footer from "./Footer";
import "../../index.css";

const AdminTemplate = props => {
  return (
    <div className="Site">
      <NavMenu />
      <div className="Site-content">
        <Container>{props.children}</Container>
      </div>
      <Footer />
    </div>
  );
};

export default AdminTemplate;
