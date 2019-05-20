import { call, put, takeLatest, delay } from "redux-saga/effects";

import api from "../../services/api";
import {
  REGISTER_REQUESTING,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  IS_UNIQUE_USERNAME_REQUESTING,
  IS_UNIQUE_USERNAME_SUCCESS,
  IS_UNIQUE_USERNAME_ERROR,
  IS_UNIQUE_EMAIL_REQUESTING,
  IS_UNIQUE_EMAIL_SUCCESS,
  IS_UNIQUE_EMAIL_ERROR
} from "./constants";
import { serverErrorsToFormErrors } from "../../helpers/messages";
import history from "../../history";

function registerApi(values) {
  return api.post("signup", values);
}

function isUniqueUsernameApi(values) {
  return api.get(`username-exists/${values}`);
}

function isUniqueEmailApi(values) {
  return api.get(`email-exists/${values}`);
}

function* fetchRegister(action) {
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

function* fetchFindByUserName(action) {
  // console.log(action);
  const isNotUniqueMsg = { username: "0This user name is already being used" };
  const { setErrors, setFieldError, setStatus, value } = action.payload;
  try {
    yield call(isUniqueUsernameApi, value);
    yield put({
      type: IS_UNIQUE_USERNAME_ERROR,
      message: isNotUniqueMsg,
      status: 422
    });
    // console.log(setFieldError);
    yield call(setFieldError, isNotUniqueMsg);
    yield call(setErrors, isNotUniqueMsg);
    yield call(setStatus, isNotUniqueMsg);
  } catch (e) {
    const { response } = e;
    if (response.status === 404) {
      yield put({ type: IS_UNIQUE_USERNAME_SUCCESS });
    } else {
      yield put({
        type: IS_UNIQUE_USERNAME_ERROR,
        message: serverErrorsToFormErrors(response),
        status: response ? response.status : 503
      });
      yield call(setErrors, serverErrorsToFormErrors(response));
    }
  }
}

function* fetchFindByEmail(action) {
  const isNotUniqueMsg = { email: "This email is already being used" };
  const { setErrors, setStatus, value } = action.payload;
  try {
    yield call(isUniqueEmailApi, value);
    yield put({
      type: IS_UNIQUE_EMAIL_ERROR,
      message: isNotUniqueMsg,
      status: 422
    });
    yield call(setErrors, isNotUniqueMsg);
    yield call(setStatus, isNotUniqueMsg);
  } catch (e) {
    const { response } = e;
    if (response.status === 404) {
      yield put({ type: IS_UNIQUE_EMAIL_SUCCESS });
    } else {
      yield put({
        type: IS_UNIQUE_EMAIL_ERROR,
        message: serverErrorsToFormErrors(response),
        status: response ? response.status : 503
      });
      yield call(setErrors, serverErrorsToFormErrors(response));
    }
  }
}

function* sagas() {
  yield takeLatest(REGISTER_REQUESTING, fetchRegister);
  yield takeLatest(IS_UNIQUE_USERNAME_REQUESTING, fetchFindByUserName);
  yield takeLatest(IS_UNIQUE_EMAIL_REQUESTING, fetchFindByEmail);
}

export default sagas;
