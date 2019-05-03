const INITIAL_STATE = [{ authenticated: false, user: {} }];

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "HANDLE_LOGIN":
      console.log(action);
      return [...state, {}];
    default:
      return state;
  }
};

export default auth;
