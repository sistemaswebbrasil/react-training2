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
  return api.get(`username-available/${values}`);
}

function isUniqueEmailApi(values) {
  return api.get(`email-available/${values}`);
}

function* fetchRegister(action) {
  const { setStatus, values } = action.payload;
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
    yield call(setStatus, serverErrorsToFormErrors(e.response));
  }
}

function* fetchFindByUserName(action) {
  const isNotUniqueMsg = { username: "This user name is already being used" };
  const { setStatus, value, status } = action.payload;
  try {
    const {
      data: { avaliable }
    } = yield call(isUniqueUsernameApi, value);
    if (avaliable === true) {
      yield put({ type: IS_UNIQUE_USERNAME_SUCCESS });
      yield call(setStatus, {});
    } else {
      yield put({
        type: IS_UNIQUE_USERNAME_ERROR,
        message: isNotUniqueMsg,
        status: 422
      });
      yield call(setStatus, { ...status, ...isNotUniqueMsg });
    }
  } catch (e) {
    const { response } = e;
    yield put({
      type: IS_UNIQUE_USERNAME_ERROR,
      message: serverErrorsToFormErrors(response),
      status: response ? response.status : 503
    });
    yield call(setStatus, serverErrorsToFormErrors(e.response));
  }
}

function* fetchFindByEmail(action) {
  const isNotUniqueMsg = { email: "This email is already being used" };
  const { setStatus, value, status } = action.payload;
  try {
    const {
      data: { avaliable }
    } = yield call(isUniqueEmailApi, value);
    if (avaliable === true) {
      yield put({ type: IS_UNIQUE_EMAIL_SUCCESS });
      yield call(setStatus, {});
    } else {
      yield put({
        type: IS_UNIQUE_EMAIL_ERROR,
        message: isNotUniqueMsg,
        status: 422
      });
      yield call(setStatus, { ...status, ...isNotUniqueMsg });
    }
  } catch (e) {
    const { response } = e;
    yield put({
      type: IS_UNIQUE_EMAIL_ERROR,
      message: serverErrorsToFormErrors(response),
      status: response ? response.status : 503
    });
    yield call(setStatus, serverErrorsToFormErrors(e.response));
  }
}
// function* fetchFindByEmail(action) {
//   const isNotUniqueMsg = { email: "This email is already being used" };
//   const { setStatus, value, status } = action.payload;
//   const statusMsg = { ...status, ...isNotUniqueMsg };
//   try {
//     yield call(isUniqueEmailApi, value);
//     yield call(setStatus, statusMsg);
//     yield put({
//       type: IS_UNIQUE_EMAIL_ERROR,
//       message: statusMsg,
//       status: 422
//     });
//   } catch (e) {
//     const { response } = e;
//     if (response.status === 404) {
//       yield put({ type: IS_UNIQUE_EMAIL_SUCCESS });
//       yield call(setStatus, _.omit(status, "email"));
//     } else {
//       yield put({
//         type: IS_UNIQUE_EMAIL_ERROR,
//         message: serverErrorsToFormErrors(response),
//         status: response ? response.status : 503
//       });
//       yield call(setStatus, serverErrorsToFormErrors(response));
//     }
//   }
// }

function* sagas() {
  yield takeLatest(REGISTER_REQUESTING, fetchRegister);
  yield takeLatest(IS_UNIQUE_USERNAME_REQUESTING, fetchFindByUserName);
  yield takeLatest(IS_UNIQUE_EMAIL_REQUESTING, fetchFindByEmail);
}

export default sagas;
