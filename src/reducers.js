import { combineReducers } from "redux";

import login from "./pages/login/reducer";
import register from "./pages/signUp/reducer";

export default combineReducers({
  login,
  register
});
