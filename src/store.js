import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";

import rootReducer from "./reducers";
import IndexSagas from "./index-sagas";

const sagaMiddleware = createSagaMiddleware();

const logger = createLogger({
  collapsed: true
});

const getMiddleware = () => {
  if (process.env.NODE_ENV === "development") {
    return applyMiddleware(sagaMiddleware, logger);
  }
  return applyMiddleware(sagaMiddleware);
};

const store = createStore(rootReducer, getMiddleware());

sagaMiddleware.run(IndexSagas);

export default store;
