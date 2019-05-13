import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { logoutRequest } from "../../pages/login/actions";

class NavMenu extends Component {
  render() {
    return (
      <Menu>
        <Menu.Item header onClick={this.handleItemClick}>
          Semantic App
        </Menu.Item>
        <Menu.Item name="Home" replace as={NavLink} exact to="/" activeClassName="active" />
        <Menu.Item name="Users" replace as={NavLink} to="/users" activeClassName="active" />
        <Menu.Item name="About" replace as={NavLink} to="/about" activeClassName="active" />
        <Menu.Menu position="right">
          <Menu.Item name="logout" onClick={this.props.logoutRequest} />
        </Menu.Menu>
      </Menu>
    );
  }
}

const mapDispatchToProps = {
  logoutRequest
};

export default connect(
  null,
  mapDispatchToProps
)(NavMenu);
