import { LOGIN_REQUESTING, LOGIN_EXISTING, LOGOUT_REQUESTING } from "./constants";

const loginRequest = function loginRequest(payload) {
  return {
    type: LOGIN_REQUESTING,
    payload
  };
};

export const logoutRequest = function loginRequest(payload) {
  return {
    type: LOGOUT_REQUESTING
  };
};

export const isAuthenticated = () => {
  return {
    type: LOGIN_EXISTING
  };
};

export default loginRequest;
