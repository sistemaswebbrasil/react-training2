import { USERS_REQUESTING, USERS_SUCCESS, USERS_ERROR } from "./constants";

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  status: 200,
  errors: [],
  list: []
};

const reducer = function loginReducer(state = initialState, action) {
  switch (action.type) {
    case USERS_REQUESTING:
      return {
        requesting: true,
        successful: false,
        messages: [{ body: "Requiring data...", time: new Date() }],
        errors: []
      };

    case USERS_SUCCESS:
      return {
        errors: [],
        messages: [],
        requesting: false,
        successful: true,
        list: action.list
      };

    case USERS_ERROR:
      return {
        errors: action.message,
        messages: [],
        requesting: false,
        status: action.status,
        successful: false
      };

    default:
      return state;
  }
};

export default reducer;
