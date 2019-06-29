import {
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_REQUESTING,
  LOGOUT_SUCCESS,
  LOGIN_EXISTING
} from "./constants";

const initialState = {
  requesting: true,
  successful: false,
  messages: [],
  status: 200,
  errors: [],
  user: null
};

const reducer = function loginReducer(state = initialState, action) {
  switch (action.type) {
    // Set the requesting flag and append a message to be shown
    case LOGIN_REQUESTING:
      return {
        requesting: true,
        successful: false,
        messages: [{ body: "Logging in...", time: new Date() }],
        errors: []
      };

    case LOGIN_EXISTING:
      return {
        requesting: true,
        successful: false,
        messages: [{ body: "Checking if logged...", time: new Date() }],
        errors: []
      };

    case LOGIN_SUCCESS:
      return {
        errors: [],
        messages: [],
        requesting: false,
        successful: true,
        user: action.user
      };

    case LOGIN_ERROR:
      return {
        errors: action.message,
        messages: [],
        requesting: false,
        status: action.status,
        successful: false
      };

    case LOGOUT_REQUESTING:
      return {
        requesting: true,
        successful: false,
        messages: [{ body: "Logging out...", time: new Date() }],
        errors: []
      };

    case LOGOUT_SUCCESS:
      return {
        errors: [],
        messages: [{ body: "You have been logged out.", time: new Date() }],
        requesting: false,
        successful: true
      };

    default:
      return state;
  }
};

export default reducer;
