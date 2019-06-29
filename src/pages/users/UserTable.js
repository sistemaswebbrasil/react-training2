import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Icon, Button } from "semantic-ui-react";

import { listUsers, deleteUser } from "./actions";
import { Link } from "react-router-dom";

export class UserTable extends Component {
  constructor(props) {
    super(props);

    this.props.listUsers();
  }

  render() {
    const {
      users: { list }
    } = this.props;
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Username</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {list &&
            list.map((item, index) => (
              <Table.Row key={index}>
                <Table.Cell collapsing>
                  <Button.Group size="mini">
                    <Button icon positive as={Link} to={`users/${item.id}/edit`}>
                      <Icon name="edit" />
                    </Button>
                    <Button icon negative onClick={this.props.userDelete}>
                      <Icon name="delete" />
                    </Button>
                  </Button.Group>
                </Table.Cell>
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

const mapDispatchToProps = { listUsers, deleteUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserTable);
