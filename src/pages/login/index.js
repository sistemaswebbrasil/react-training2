import React, { Component } from "react";
import { Button, Form, Grid, Header, Image, Message, Segment } from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import { Formik } from "formik";
import Yup from "yup";
import { connect } from "react-redux";

import loginRequest from "./actions";
import logo from "../../logo.png";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("E-mail is not valid!")
    .required("E-mail is required!"),
  password: Yup.string()
    .min(3, "Password has to be longer than 3 characters!")
    .required("Password is required!")
});

class Login extends Component {
  render() {
    const { login } = this.props;

    if (login.user) {
      return <Redirect to="/" />;
    }

    return (
      <Grid textAlign="center" style={{ height: "100%" }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            <Image src={logo} /> Log-in to your account
          </Header>
          <Formik
            initialValues={{ email: "teste@teste.com", password: "testes" }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setErrors, isValid, resetForm }) => {
              this.props.loginRequest({ values, setErrors, isValid });
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid }) => (
              <Form size="large" onSubmit={handleSubmit} loading={login.requesting} error={login.errors ? true : false}>
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="E-mail addres"
                    type="email"
                    id="email"
                    autoComplete="off"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    error={(errors.email || errors.unauthorized) && touched.email}
                  />
                  {errors.email && touched.email && <Message error content={errors.email} />}
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    id="password"
                    autoComplete="off"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    error={(errors.password || errors.unauthorized) && touched.password}
                  />
                  {errors.password && touched.password && <Message error content={errors.password} />}
                  <Button color="teal" fluid size="large" type="submit" /*disabled={!isValid && login.status < 500}*/>
                    Login
                  </Button>
                  {errors.general && <Message error header={errors.general.title} content={errors.general.message} />}
                  {errors.unauthorized && (
                    <Message error header={errors.unauthorized.title} content={errors.unauthorized.message} />
                  )}
                </Segment>
              </Form>
            )}
          </Formik>
          <Message>
            New to us? <Link to="/sign-up">Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state.login
  };
};

const mapDispatchToProps = {
  loginRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
