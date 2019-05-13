import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, Grid, Header, Image, Message, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import Yup from "yup";

import logo from "../../logo.png";
import { registerRequest } from "./actions";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, "User Name has to be longer than 5 characters!")
    .required("User Name is required!"),
  email: Yup.string()
    .email("E-mail is not valid!")
    .required("E-mail is required!"),
  password: Yup.string()
    .min(3, "Password has to be longer than 3 characters!")
    .required("Password is required!"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null])
    .required("Password confirm is required")
});

class SignUp extends Component {
  render() {
    const { register } = this.props;
    return (
      <Grid textAlign="center" style={{ height: "100%" }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            <Image src={logo} /> Sign Up
          </Header>
          <Formik
            initialValues={{
              username: `teste`,
              email: `teste@teste.com`,
              password: "teste",
              passwordConfirm: "teste"
            }}
            // initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setErrors, isValid, resetForm }) => {
              this.props.registerRequest({ values, setErrors, isValid });
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid, dirty }) => (
              <Form
                size="large"
                onSubmit={handleSubmit}
                loading={registerRequest.requesting}
                error={errors ? true : false}
              >
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="User Name"
                    type="username"
                    id="username"
                    autoComplete="off"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    error={errors.username && touched.username}
                  />
                  <Form.Input
                    fluid
                    icon="mail"
                    iconPosition="left"
                    placeholder="E-mail addres"
                    type="email"
                    id="email"
                    autoComplete="off"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    error={errors.email && touched.email}
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
                    error={errors.password && touched.password}
                  />
                  {errors.password && touched.password && <Message error content={errors.password} />}
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Confirm Password"
                    type="password"
                    id="passwordConfirm"
                    autoComplete="off"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.passwordConfirm}
                    error={errors.passwordConfirm && touched.passwordConfirm}
                  />
                  {errors.passwordConfirm && touched.passwordConfirm && (
                    <Message error content={errors.passwordConfirm} />
                  )}

                  <Button
                    color="teal"
                    fluid
                    size="large"
                    type="submit" /*disabled={!isValid && register.status < 500}*/
                  >
                    Register
                  </Button>
                  {errors.general && <Message error header={errors.general.title} content={errors.general.message} />}
                  {register.successful && (
                    <Message positive>
                      <Message.Header>Success</Message.Header>
                      <p>User Successfully Registered</p>
                    </Message>
                  )}
                </Segment>
              </Form>
            )}
          </Formik>
          <Message>
            Already have an account? <Link to="/login">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    register: state.register
  };
};

const mapDispatchToProps = {
  registerRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
