import { call, put, takeLatest } from "redux-saga/effects";

import api from "../../services/api";
import {
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_EXISTING,
  LOGOUT_SUCCESS,
  LOGOUT_REQUESTING
} from "./constants";
import { serverErrorsToFormErrors } from "../../helpers/messages";
import { login, logout } from "../../services/auth";
import history from "../../history";

function loginApi(authParams) {
  return api.post("login", authParams);
}

function getProfile() {
  return api.get("profile");
}

function* fetchLogin(action) {
  const { setErrors, values } = action.payload;
  try {
    const { data } = yield call(loginApi, values);
    yield put({ type: LOGIN_SUCCESS, user: data.user });
    login(data.token);
    history.push("/");
  } catch (e) {
    const { response } = e;
    yield put({
      type: LOGIN_ERROR,
      message: serverErrorsToFormErrors(response),
      status: response ? response.status : 503
    });
    yield call(setErrors, serverErrorsToFormErrors(e.response));
  }
}

function* fetchLogout(action) {
  yield put({ type: LOGOUT_SUCCESS });
  yield call(logout);
  history.push("/login");
}

function* isAuthenticated() {
  try {
    const { data } = yield call(getProfile);
    yield put({
      type: LOGIN_SUCCESS,
      user: {
        email: data.email,
        username: data.username
      }
    });
  } catch (e) {
    yield put({
      type: LOGIN_ERROR,
      message: "Not Logged",
      status: 401
    });
    yield call(logout);
  }
}

function* sagas() {
  yield takeLatest(LOGIN_REQUESTING, fetchLogin);
  yield takeLatest(LOGIN_EXISTING, isAuthenticated);
  yield takeLatest(LOGOUT_REQUESTING, fetchLogout);
}

export default sagas;
