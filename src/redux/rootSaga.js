import { all } from "redux-saga/effects";
import featuredSaga from "./sagas/featuredSaga";
import moviesSaga from "./sagas/moviesSaga";

function* rootSaga() {
  yield all([featuredSaga(), moviesSaga()]);
}

export default rootSaga;
