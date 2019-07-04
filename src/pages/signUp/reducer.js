import {
  REGISTER_REQUESTING,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  RESET_APP,
  IS_UNIQUE_USERNAME_REQUESTING,
  IS_UNIQUE_USERNAME_SUCCESS,
  IS_UNIQUE_USERNAME_ERROR,
  IS_UNIQUE_EMAIL_REQUESTING,
  IS_UNIQUE_EMAIL_SUCCESS,
  IS_UNIQUE_EMAIL_ERROR
} from "./constants";

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  status: 200,
  errors: [],
  user: null
};

const reducer = function loginReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_APP:
      return initialState;

    case REGISTER_REQUESTING:
      return {
        requesting: true,
        successful: false,
        messages: [{ body: "registering ...", time: new Date() }],
        errors: [],
        userRegisterSucces: false
      };

    case REGISTER_SUCCESS:
      return {
        errors: [],
        messages: "User Successfully Registered",
        requesting: false,
        successful: true,
        user: action.user,
        userRegisterSucces: true
      };

    case REGISTER_ERROR:
      return {
        errors: action.message,
        messages: [],
        requesting: false,
        status: action.status,
        successful: false,
        userRegisterSucces: false
      };

    case IS_UNIQUE_USERNAME_REQUESTING:
      return {
        requesting: true,
        successful: false,
        messages: [{ body: "searching ...", time: new Date() }],
        errors: state.errors
      };

    case IS_UNIQUE_USERNAME_SUCCESS:
      return {
        errors: state.errors,
        messages: [],
        requesting: false,
        successful: false
      };

    case IS_UNIQUE_USERNAME_ERROR:
      return {
        errors: action.message,
        messages: [],
        requesting: false,
        status: action.status,
        successful: false
      };

    case IS_UNIQUE_EMAIL_REQUESTING:
      return {
        requesting: true,
        successful: false,
        messages: [{ body: "searching ...", time: new Date() }],
        errors: state.errors
      };

    case IS_UNIQUE_EMAIL_SUCCESS:
      return {
        messages: [],
        requesting: false,
        successful: false,
        errors: state.errors
      };

    case IS_UNIQUE_EMAIL_ERROR:
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
