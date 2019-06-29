import { put, call, takeLatest } from "redux-saga/effects";

import api from "../../services/api";
import * as types from "./constants";
import { serverErrorsToFormErrors } from "../../helpers/messages";
import history from "../../history";

function* getListUsers() {
  try {
    const { data } = yield api.get("users");
    yield put({ type: types.USERS_SUCCESS, list: data });
  } catch (e) {
    const { response } = e;
    yield put({
      type: types.USERS_ERROR,
      message: serverErrorsToFormErrors(response)
    });
  }
}

function* getUser({ payload }) {
  try {
    const { data } = yield api.get(`users/${payload}`);
    yield put({ type: types.USER_SUCCESS, item: data });
  } catch (e) {
    const { response } = e;
    yield put({
      type: types.USER_ERROR,
      message: serverErrorsToFormErrors(response)
    });
  }
}

function* saveUser(action) {
  const { setStatus, values } = action.payload;
  console.log(action);
  try {
    const { data } = yield api.postOrPut("users", values.id, values);
    yield put({ type: types.USER_SAVE_SUCCESS, item: data });
    history.push("/users");
  } catch (e) {
    const { response } = e;
    yield put({
      type: types.USER_SAVE_ERROR,
      message: serverErrorsToFormErrors(response),
      status: response ? response.status : 503
    });
    yield call(setStatus, serverErrorsToFormErrors(e.response));
  }
}

function* changePassword(action) {
  const { setStatus, values } = action.payload;
  try {
    const { data } = yield api.postOrPut("change-password", null, values);
    yield put({ type: types.CHANGE_PASSWORD_SUCCESS, item: data });
    yield call(setStatus, {});
  } catch (e) {
    const { response } = e;
    yield put({
      type: types.CHANGE_PASSWORD_ERROR,
      message: serverErrorsToFormErrors(response),
      status: response ? response.status : 503
    });
    yield call(setStatus, serverErrorsToFormErrors(e.response));
  }
}

function* sagas() {
  yield takeLatest(types.USERS_REQUESTING, getListUsers);
  yield takeLatest(types.USER_REQUESTING, getUser);
  yield takeLatest(types.USER_SAVE_REQUESTING, saveUser);
  yield takeLatest(types.CHANGE_PASSWORD_REQUESTING, changePassword);
}

export default sagas;
