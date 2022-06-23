import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import requestUrls from "../../requestUrls";
import {
  adventureMoviesError,
  getAdventureMovies,
  setAdventureMovies,
} from "../movies/adventureMoviesSlice";

function* getAdventureMoviesFunction() {
  try {
    const res = yield axios.get(requestUrls.fetchAdventureMovies);
    yield put(setAdventureMovies(res.data.results));
  } catch (error) {
    yield put(adventureMoviesError(error));
  }
}

function* adventureMoviesSaga() {
  yield takeLatest(getAdventureMovies.type, getAdventureMoviesFunction);
}

export default adventureMoviesSaga;
