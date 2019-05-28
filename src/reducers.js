import { combineReducers } from "redux";

import login from "./pages/login/reducer";
import register from "./pages/signUp/reducer";
import users from "./pages/users/reducer";

export default combineReducers({
  login,
  register,
  users
});
