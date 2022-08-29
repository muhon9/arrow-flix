import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import requestUrls from '../../requestUrls';
import {
  actionMoviesError,
  getActionMovies,
  setActionMovies,
} from '../movies/actionMoviesSlice';

function* getActionMoviesFunction() {
  try {
    const res = yield axios.get(requestUrls.fetchActionMovies);
    yield put(setActionMovies(res.data.results));
  } catch (error) {
    yield put(actionMoviesError(error));
  }
}

function* actionMoviesSaga() {
  yield takeLatest(getActionMovies.type, getActionMoviesFunction);
}

export default actionMoviesSaga;
