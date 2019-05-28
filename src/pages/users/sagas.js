import { put, takeLatest } from "redux-saga/effects";

import api from "../../services/api";
import * as types from "./constants";
import { serverErrorsToFormErrors } from "../../helpers/messages";

function* fetchRegisters() {
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

function* sagas() {
  yield takeLatest(types.USERS_REQUESTING, fetchRegisters);
}

export default sagas;
