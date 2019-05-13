const REGISTER_USER = "REGISTER_USER";

export const registerUserAction = user => {
  return {
    type: REGISTER_USER,
    user
  };
};
