import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { NavLink, withRouter } from "react-router-dom";

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
          <Menu.Item name="logout" as={NavLink} to="/login" />
        </Menu.Menu>
      </Menu>
    );
  }
}

export default withRouter(NavMenu);
