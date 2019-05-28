import * as types from "./constants";

export const usersRequest = payload => {
  return {
    type: types.USERS_REQUESTING,
    payload
  };
};
