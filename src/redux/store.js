import createSagaMiddleware from "@redux-saga/core";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import modalReducer from "./modal/modalSlice";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
  middleware: [...middlewares, ...getDefaultMiddleware({ thunk: false })],
});

sagaMiddleware.run(rootSaga);
export default store;
