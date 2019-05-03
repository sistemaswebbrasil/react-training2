import React, { Component } from "react";
import { Button, Form, Grid, Header, Image, Message, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Formik } from "formik";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { login } from "./action";

import logo from "../../logo.png";
import api from "../../services/api";
import { serverErrorsToFormErrors } from "../../helpers/messages";

class Login extends Component {
  componentWillMount() {
    const { auth } = this.props;
    console.log(auth);
  }

  render() {
    return (
      <Grid textAlign="center" style={{ height: "100%" }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            <Image src={logo} /> Log-in to your account
          </Header>
          <Formik
            initialValues={{ email: "teste@teste.com", password: "teste" }}
            validate={values => {
              let errors = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = "Invalid email address";
              }
              if (!values.password) {
                errors.password = "Required";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              // try {
              //   await api.post("login", values);
              //   setSubmitting(false);
              // } catch (e) {
              //   setSubmitting(false);
              //   setErrors(serverErrorsToFormErrors(e.response));
              // }

              const { login } = this.props;
              login(values);
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, isValid }) => (
              <Form size="large" onSubmit={handleSubmit} loading={isSubmitting} error={!isValid}>
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
                  <Button color="teal" fluid size="large" type="submit" disabled={!isValid && !errors.general}>
                    Login
                  </Button>
                  {errors.general && <Message error header={errors.general.title} content={errors.general.message} />}
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

// export default Login;

const mapStateToProps = state => ({
  auth: state
});

// const mapStateToProps = state => ({ tab: state.tab });

const mapDispatchToProps = dispatch => bindActionCreators({ login }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
