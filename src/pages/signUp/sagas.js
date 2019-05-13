import { call, put, takeLatest, delay } from "redux-saga/effects";

import api from "../../services/api";
import { REGISTER_REQUESTING, REGISTER_SUCCESS, REGISTER_ERROR } from "./constants";
import { serverErrorsToFormErrors } from "../../helpers/messages";
import history from "../../history";

function registerApi(values) {
  return api.post("signup", values);
}

function* fetchRegister(action) {
  console.log(action);
  const { setErrors, values } = action.payload;
  try {
    const { data } = yield call(registerApi, values);
    yield put({ type: REGISTER_SUCCESS, user: data });
    yield delay(3000);
    yield put({ type: "RESET_APP" });
    history.push("/login");
  } catch (e) {
    const { response } = e;
    yield put({
      type: REGISTER_ERROR,
      message: serverErrorsToFormErrors(response),
      status: response ? response.status : 503
    });
    yield call(setErrors, serverErrorsToFormErrors(e.response));
  }
}

function* sagas() {
  yield takeLatest(REGISTER_REQUESTING, fetchRegister);
}

export default sagas;
