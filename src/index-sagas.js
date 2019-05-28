import { all } from "redux-saga/effects";

import login from "./pages/login/sagas";
import register from "./pages/signUp/sagas";
import users from "./pages/users/sagas";

export default function* rootSaga() {
  yield all([login(), register(), users()]);
}
