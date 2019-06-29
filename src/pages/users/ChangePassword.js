import React from "react";
import { connect } from "react-redux";
import { Modal, Button, Form, Message } from "semantic-ui-react";
import { Formik } from "formik";
import Yup from "yup";
import { toast } from "react-toastify";

import ModalGrid from "../../template/form/ModalGrid";
import { changePassword } from "./actions";
import ModalForm from "../../template/form/ModalForm";

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(3, "Current Password has to be longer than 3 characters!")
    .required("Current Password is required!"),
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

class MyModal extends React.Component {
  _isMounted = false;

  componentDidUpdate(prevProps) {
    if (this.props.users.changePasswordSucces === true && prevProps.users.changePasswordSucces === false) {
      this.notify(this.props.users.messages);
    }
  }

  notify = message => {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER
    });

    setTimeout(() => {
      this.props.handleClose();
    }, 1000);
  };

  render() {
    const { id, users } = this.props;
    return (
      <Modal open={this.props.modalOpen}>
        <Modal.Header>Change Password</Modal.Header>
        <Modal.Content scrolling>
          <ModalGrid>
            <h1>A:{JSON.stringify(users.successful)}</h1>
            <Formik
              ref={el => (this.form = el)}
              enableReinitialize={false}
              initialValues={{
                id: id,
                currentPassword: "",
                password: "",
                passwordConfirm: ""
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setErrors, setStatus }) => {
                this.props.changePassword({ values, setErrors, setStatus });
              }}
            >
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit, status }) => (
                <ModalForm onSubmit={handleSubmit} loading={users.requesting}>
                  <input type="hidden" readOnly value={values.id} />

                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="current Password"
                    type="password"
                    id="currentPassword"
                    autoComplete="off"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.currentPassword}
                    error={errors.currentPassword && touched.currentPassword}
                  />
                  {status && status.currentPassword ? (
                    <Message error content={status.currentPassword} />
                  ) : (
                    errors.username && <Message error content={errors.currentPassword} />
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
                  {status && status.passwordConfirm ? (
                    <Message error content={status.passwordConfirm} />
                  ) : (
                    errors.passwordConfirm && <Message error content={errors.passwordConfirm} />
                  )}
                  {users.errors.general && (
                    <Message error header={users.errors.general.title} content={users.errors.general.message} />
                  )}
                </ModalForm>
              )}
            </Formik>
          </ModalGrid>
        </Modal.Content>
        <Modal.Actions>
          <Button.Group floated="left">
            <Button positive onClick={() => this.form.handleSubmit()} type="button">
              Change
            </Button>
          </Button.Group>
          <Button.Group floated="right">
            <Button negative onClick={this.props.handleClose}>
              Cancel
            </Button>
          </Button.Group>
        </Modal.Actions>
        <br />
        <br />
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  };
};

const mapDispatchToProps = {
  changePassword
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyModal);
