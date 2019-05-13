import { REGISTER_REQUESTING } from "./constants";

export const registerRequest = payload => {
  console.log(payload);
  return {
    type: REGISTER_REQUESTING,
    payload
  };
};
