import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, Grid, Header, Message, Segment } from "semantic-ui-react";
import { Formik } from "formik";
import Yup from "yup";
import { toast } from "react-toastify";

import { saveUser, getUser } from "./actions";
import ChangePassword from "./ChangePassword";

const validationSchemaCreate = Yup.object().shape({
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

const validationSchemaUpdate = Yup.object().shape({
  username: Yup.string()
    .min(5, "User Name has to be longer than 5 characters!")
    .required("User Name is required!"),
  email: Yup.string()
    .email("E-mail is not valid!")
    .required("E-mail is required!")
});

class UserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.users.userSaveSucces === true && prevProps.users.userSaveSucces === false) {
      this.notify(this.props.users.messages);
    }
  }

  notify = message => {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER
    });
  };

  componentWillMount() {
    const { match } = this.props;
    if (match.params.id) {
      this.props.getUser(match.params.id);
    }
  }

  render() {
    const { users } = this.props;
    const { item = {} } = users;
    const {
      match: {
        params: { id }
      }
    } = this.props;
    return (
      <Grid verticalAlign="middle">
        <Grid.Column>
          <Header as="h2" color="teal">
            User
          </Header>
          <Formik
            ref={el => (this.form = el)}
            enableReinitialize={true}
            initialValues={{
              id: item.id ? item.id : "",
              username: item.username ? item.username : "",
              email: item.email ? item.email : "",
              password: "",
              passwordConfirm: ""
            }}
            validationSchema={id ? validationSchemaUpdate : validationSchemaCreate}
            onSubmit={async (values, { setErrors, setStatus }) => {
              this.props.saveUser({ values, setErrors, setStatus });
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid, status }) => (
              <Form size="large" onSubmit={handleSubmit} loading={users.requesting} error>
                <input type="hidden" value={values.id} />
                <Segment stacked>
                  <Form.Group widths="equal">
                    <Form.Field>
                      <label>User Name</label>
                      <Form.Input
                        fluid
                        icon="user"
                        iconPosition="left"
                        placeholder="User Name"
                        type="text"
                        id="username"
                        autoComplete="off"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                        error={errors.username && touched.username}
                      />
                      {status && status.email ? (
                        <Message error content={status.username} />
                      ) : (
                        errors.username && <Message error content={errors.username} />
                      )}
                    </Form.Field>
                    <Form.Field>
                      <label>Email</label>
                      <Form.Input
                        fluid
                        icon="mail"
                        iconPosition="left"
                        placeholder="E-mail addres"
                        type="email"
                        id="email"
                        autoComplete="off"
                        onChange={handleChange}
                        onBlur={this.props.handleBlur}
                        value={values.email}
                        error={errors.email && touched.email}
                      />
                      {status && status.email ? (
                        <Message error content={status.email} />
                      ) : (
                        errors.email && <Message error content={errors.email} />
                      )}
                    </Form.Field>
                  </Form.Group>
                  {!id && (
                    <>
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
                      {status && status.password ? (
                        <Message error content={status.password} />
                      ) : (
                        errors.password && <Message error content={errors.password} />
                      )}
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
                    </>
                  )}
                  <div>
                    <Button floated="right" color="teal" size="large" type="submit" disabled={!isValid}>
                      Save
                    </Button>
                    {id && (
                      <>
                        <Button
                          key="button1"
                          content="Change Password"
                          floated="left"
                          color="teal"
                          positive
                          type="button"
                          size="large"
                          onClick={() => {
                            this.setState({ modalOpen: true });
                          }}
                        />
                        <ChangePassword
                          id={id}
                          modalOpen={this.state.modalOpen}
                          handleClose={() => {
                            this.setState({ modalOpen: false });
                          }}
                        />
                      </>
                    )}
                  </div>
                  <br />
                  <br />

                  {errors.general && <Message error header={errors.general.title} content={errors.general.message} />}
                </Segment>
              </Form>
            )}
          </Formik>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  };
};

const mapDispatchToProps = {
  saveUser,
  getUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserForm);
