import * as types from "./constants";

export const usersRequest = payload => {
  return {
    type: types.USERS_REQUESTING,
    payload
  };
};

export const userEdit = payload => {
  return {
    type: types.USER_EDIT,
    payload
  };
};

export const userDelete = payload => {
  return {
    type: types.USER_DELETE,
    payload
  };
};

export const saveRegister = payload => {
  return {
    type: types.USER_SAVE,
    payload
  };
};

export const findByUserNameRequest = payload => {
  return {
    type: types.IS_UNIQUE_EMAIL_REQUESTING,
    payload
  };
};

export const findByEmailRequest = payload => {
  return {
    type: types.IS_UNIQUE_EMAIL_REQUESTING,
    payload
  };
};
