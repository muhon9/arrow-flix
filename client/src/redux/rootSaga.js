import { all } from "redux-saga/effects";
import featuredSaga from "./sagas/featuredSaga";
import moviesSaga from "./sagas/moviesSaga";
import tmdbSaga from "./sagas/tmdbSaga";

function* rootSaga() {
  yield all([featuredSaga(), moviesSaga(), tmdbSaga()]);
}

export default rootSaga;
