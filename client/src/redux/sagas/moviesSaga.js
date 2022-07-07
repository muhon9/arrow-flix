import axios from "axios";
import { all, put, takeLatest } from "redux-saga/effects";
import requestUrls from "../../requestUrls";
import {
  actionMoviesError,
  getActionMovies,
  setActionMovies,
} from "../movies/actionMoviesSlice";
import {
  adventureMoviesError,
  getAdventureMovies,
  setAdventureMovies,
} from "../movies/adventureMoviesSlice";

function* getActionMoviesFunction() {
  try {
    const res = yield axios.get(requestUrls.fetchActionMovies);
    yield put(setActionMovies(res.data.results));
  } catch (error) {
    yield put(actionMoviesError(error));
  }
}

function* getAdventureMoviesFunction() {
  try {
    const res = yield axios.get(requestUrls.fetchAdventureMovies);
    yield put(setAdventureMovies(res.data.results));
  } catch (error) {
    yield put(adventureMoviesError(error));
  }
}

function* moviesSaga() {
  yield all([
    takeLatest(getActionMovies.type, getActionMoviesFunction),
    takeLatest(getAdventureMovies.type, getAdventureMoviesFunction),
  ]);
}

export default moviesSaga;
