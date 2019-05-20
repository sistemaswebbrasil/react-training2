import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, Grid, Header, Image, Message, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import Yup from "yup";

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

class SignUp extends Component {
  /*
  componentDidUpdate() {
    const {
      register: { errors }
    } = this.props;

    // console.log(errors);

    if (errors.length > 0) {
      errors.forEach(value => {
        // this.form.setErrors(value);
        // console.log(Object.keys(value)); // console: ['0', '1', '2']
        // console.log(Object.value(value)); // console: ['0', '1', '2']

        for (var [key, val] of Object.entries(value)) {
          // console.log("key:" + key + " value: " + val); // "a 5", "b 7", "c 9"

          this.form.setFieldError(key, val);
        }

        // this.form.setFieldError(value);
      });
    }

    // this.form.setFieldError("email", "error");

    // this.form.setErrors(errors);
  }
  */

  render() {
    const { register } = this.props;

    return (
      <Grid textAlign="center" style={{ height: "100%" }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            <Image src={logo} /> Sign Up
          </Header>

          <Formik
            ref={el => (this.form = el)}
            initialValues={{
              username: `teste`,
              email: `teste@teste.com`,
              password: "teste",
              passwordConfirm: "teste"
            }}
            // initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setErrors }) => {
              this.props.registerRequest({ values, setErrors });
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
              dirty,
              setFieldValue,
              setErrors,
              setFieldError,
              setStatus,
              status
            }) => (
              <Form
                size="large"
                onSubmit={handleSubmit}
                loading={registerRequest.requesting}
                // error={errors ? true : false}
                error
              >
                <Segment stacked>
                  <h1>{JSON.stringify(register.errors)}</h1>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="User Name"
                    type="username"
                    id="username"
                    autoComplete="off"
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    // onChange={e => {
                    //   const { value } = e.target;
                    //   console.warn(value);
                    //   if (value.length >= 5) {
                    //     this.props.findByUserNameRequest({ value, setErrors, setFieldError, setStatus });
                    //   }
                    //   setFieldValue("username", e.target.value);
                    // }}
                    onBlur={e => {
                      const { value } = e.target;
                      this.props.findByUserNameRequest({ value, setErrors, setFieldError, setStatus });
                      // console.log("#######");
                      // console.log(e);
                      // console.log(value);
                    }}
                    value={values.username}
                    error={errors.username && touched.username}
                    autoFocus
                  />
                  {errors.username && <Message error content={errors.username} />}
                  <h1>{JSON.stringify(errors)}</h1>
                  <Form.Input
                    fluid
                    icon="mail"
                    iconPosition="left"
                    placeholder="E-mail addres"
                    type="email"
                    id="email"
                    autoComplete="off"
                    onChange={handleChange}
                    // onChange={e => {
                    //   const { value } = e.target;
                    //   if (value.length >= 5) {
                    //     this.props.findByEmailRequest({ value, setErrors, setStatus });
                    //   }
                    //   setFieldValue("email", e.target.value);
                    // }}
                    // onBlur={handleBlur}
                    onBlur={e => {
                      const { value } = e.target;
                      this.props.findByEmailRequest({ value, setErrors, setStatus });
                    }}
                    value={values.email}
                    error={errors.email && touched.email}
                  />
                  {errors.email && <Message error content={errors.email} />}
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
                  <h1>{JSON.stringify(status)}</h1>
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
  registerRequest,
  findByUserNameRequest,
  findByEmailRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
