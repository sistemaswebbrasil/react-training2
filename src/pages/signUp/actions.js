import { REGISTER_REQUESTING, IS_UNIQUE_USERNAME_REQUESTING, IS_UNIQUE_EMAIL_REQUESTING } from "./constants";

export const registerRequest = payload => {
  return {
    type: REGISTER_REQUESTING,
    payload
  };
};

export const findByUserNameRequest = payload => {
  return {
    type: IS_UNIQUE_USERNAME_REQUESTING,
    payload
  };
};

export const findByEmailRequest = payload => {
  return {
    type: IS_UNIQUE_EMAIL_REQUESTING,
    payload
  };
};
