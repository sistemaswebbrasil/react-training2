import React, { Component } from "react";
import { Button, Form, Grid, Header, Image, Message, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

import logo from "../../logo.png";

class Login extends Component {
  render() {
    return (
      <Grid textAlign="center" style={{ height: "100%" }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            <Image src={logo} /> Log-in to your account
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input fluid icon="user" iconPosition="left" placeholder="E-mail address" />
              <Form.Input fluid icon="lock" iconPosition="left" placeholder="Password" type="password" />

              <Button color="teal" fluid size="large">
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us? <Link to="/sign-up">Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
