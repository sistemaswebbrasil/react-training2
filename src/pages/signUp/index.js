import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, Grid, Header, Image, Message, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import Yup from "yup";
import { toast } from "react-toastify";

import logo from "../../logo.png";
import { registerRequest, findByUserNameRequest, findByEmailRequest } from "./actions";

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

toast.configure({
  autoClose: 5000,
  draggable: false
});

class SignUp extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.register.userRegisterSucces === true && prevProps.register.userRegisterSucces === false) {
      this.notify(this.props.register.messages);
    }
  }

  notify = message => {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER
    });
  };

  render() {
    return (
      <Grid textAlign="center" style={{ height: "100%" }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            <Image src={logo} /> Sign Up
          </Header>

          <Formik
            ref={el => (this.form = el)}
            initialValues={{
              username: "aspcore",
              email: "aspcore@teste.com",
              password: "teste",
              passwordConfirm: "teste"
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setErrors, setStatus }) => {
              this.props.registerRequest({ values, setErrors, setStatus });
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isValid,
              setFieldValue,
              setErrors,
              setFieldError,
              setStatus,
              status
            }) => (
              <Form size="large" onSubmit={handleSubmit} loading={registerRequest.requesting} error>
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="User Name"
                    type="username"
                    id="username"
                    autoComplete="off"
                    onChange={e => {
                      const { value } = e.target;
                      if (value.length >= 5) {
                        this.props.findByUserNameRequest({
                          value,
                          setErrors,
                          setFieldError,
                          setStatus,
                          errors,
                          status
                        });
                      }
                      setFieldValue("username", e.target.value);
                    }}
                    onBlur={e => {
                      const { value } = e.target;
                      if (value.length >= 5) {
                        this.props.findByUserNameRequest({
                          value,
                          setErrors,
                          setFieldError,
                          setStatus,
                          errors,
                          status
                        });
                      }
                    }}
                    value={values.username}
                    error={errors.username && touched.username}
                    autoFocus
                  />

                  {status && status.username ? (
                    <Message error content={status.username} />
                  ) : (
                    errors.username && <Message error content={errors.username} />
                  )}

                  <Form.Input
                    fluid
                    icon="mail"
                    iconPosition="left"
                    placeholder="E-mail addres"
                    type="email"
                    id="email"
                    autoComplete="off"
                    onChange={e => {
                      const { value } = e.target;
                      if (value.length >= 5) {
                        this.props.findByEmailRequest({ value, setErrors, setStatus, errors, status });
                      }
                      setFieldValue("email", e.target.value);
                    }}
                    onBlur={e => {
                      const { value } = e.target;
                      if (value.length >= 5) {
                        this.props.findByEmailRequest({ value, setErrors, setStatus, errors, status });
                      }
                    }}
                    value={values.email}
                    error={errors.email && touched.email}
                  />
                  {status && status.email ? (
                    <Message error content={status.email} />
                  ) : (
                    errors.email && <Message error content={errors.email} />
                  )}

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
                  <Button color="teal" fluid size="large" type="submit" /*disabled={!isValid}*/>
                    Register
                  </Button>
                  {errors.general && <Message error header={errors.general.title} content={errors.general.message} />}
                  {/* {register.successful && (
                    <Message positive>
                      <Message.Header>Success</Message.Header>
                      <p>User Successfully Registered</p>
                    </Message>
                  )} */}
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
  registerRequest,
  findByUserNameRequest,
  findByEmailRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
