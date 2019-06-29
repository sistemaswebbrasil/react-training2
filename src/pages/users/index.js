import React from "react";
import UserTable from "./UserTable";
import { Header, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Users = () => {
  return (
    <>
      <Header as="h2" color="teal">
          Users
      </Header>
      <div>        
        <Button floated='right' circular icon='plus' positive as={Link} to={`users/create`} />
        <br />
        <br />
      </div>
      <UserTable />
    </>
  );
};

export default Users;
