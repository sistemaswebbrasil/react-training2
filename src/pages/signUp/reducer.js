import { REGISTER_REQUESTING, REGISTER_SUCCESS, REGISTER_ERROR, RESET_APP } from "./constants";

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
        errors: []
      };

    case REGISTER_SUCCESS:
      return {
        errors: [],
        messages: [],
        requesting: false,
        successful: true,
        user: action.user
      };

    case REGISTER_ERROR:
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
