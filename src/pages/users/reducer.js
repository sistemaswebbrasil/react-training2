import { USERS_REQUESTING, USERS_SUCCESS, USERS_ERROR, USER_REQUESTING, USER_SUCCESS, USER_ERROR } from "./constants";
import * as types from "./constants";

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  status: 200,
  errors: [],
  list: [],
  item: {}
};

const reducer = function usersReducer(state = initialState, action) {
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

    case USER_REQUESTING:
      return {
        requesting: true,
        successful: false,
        messages: [{ body: "Requiring data...", time: new Date() }],
        errors: []
      };

    case USER_SUCCESS:
      return {
        errors: [],
        messages: [],
        requesting: false,
        successful: true,
        item: action.item
      };

    case USER_ERROR:
      return {
        errors: action.message,
        messages: [],
        requesting: false,
        status: action.status,
        successful: false
      };

    //

    case types.USER_SAVE_REQUESTING:
      return {
        requesting: true,
        successful: false,
        messages: [{ body: "registering ...", time: new Date() }],
        item: state.item,
        errors: [],
        userSaveSucces: false
      };

    case types.USER_SAVE_SUCCESS:
      return {
        errors: [],
        messages: "User saved successfully",
        requesting: false,
        successful: true,
        item: action.item,
        userSaveSucces: true
      };

    case types.USER_SAVE_ERROR:
      return {
        errors: action.message,
        messages: [],
        requesting: false,
        status: action.status,
        successful: false,
        item: state.item,
        userSaveSucces: false
      };

    //

    case types.CHANGE_PASSWORD_REQUESTING:
      return {
        requesting: true,
        successful: false,
        messages: [{ body: "registering ...", time: new Date() }],
        item: state.item,
        errors: [],
        changePasswordSucces: false
      };

    case types.CHANGE_PASSWORD_SUCCESS:
      return {
        errors: [],
        messages: "Password successfully changed",
        requesting: false,
        successful: true,
        item: state.item,
        changePasswordSucces: true
      };

    case types.CHANGE_PASSWORD_ERROR:
      return {
        errors: action.message,
        messages: [],
        requesting: false,
        status: action.status,
        successful: false,
        item: state.item,
        changePasswordSucces: false
      };

    default:
      return state;
  }
};

export default reducer;
