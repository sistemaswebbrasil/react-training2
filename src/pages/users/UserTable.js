import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "semantic-ui-react";

import { usersRequest } from "./actions";

export class UserTable extends Component {
  constructor(props) {
    super(props);

    this.props.usersRequest();
  }

  render() {
    const {
      users: { list }
    } = this.props;
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Username</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {list &&
            list.map((item, index) => (
              <Table.Row key={index}>
                <Table.Cell>{item.id}</Table.Cell>
                <Table.Cell>{item.username}</Table.Cell>
                <Table.Cell>{item.email}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  };
};

const mapDispatchToProps = { usersRequest };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserTable);
