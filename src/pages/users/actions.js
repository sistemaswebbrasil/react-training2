import * as types from "./constants";

export const listUsers = payload => {
  return {
    type: types.USERS_REQUESTING,
    payload
  };
};

export const getUser = payload => {
  return {
    type: types.USER_REQUESTING,
    payload
  };
};

export const deleteUser = payload => {
  return {
    type: types.USER_DELETE_REQUESTING,
    payload
  };
};

export const saveUser = payload => {
  return {
    type: types.USER_SAVE_REQUESTING,
    payload
  };
};

export const changePassword = payload => {
  return {
    type: types.CHANGE_PASSWORD_REQUESTING,
    payload
  };
};