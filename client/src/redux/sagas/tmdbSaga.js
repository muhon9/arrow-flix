import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { getTmdbData, setTmdbData, tmdbError } from '../tmdb/tmdbSlice';

function* fetchTmdbData({ payload }) {
  console.log('Saga triggered', payload);
  try {
    const res = yield axios.get(
      `https://api.themoviedb.org/3/movie/${payload}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos`
    );
    console.log(res.data);
    yield put(setTmdbData(res.data));
  } catch (error) {
    yield put(tmdbError(error.message));
  }
}

function* tmdbSaga() {
  yield takeLatest(getTmdbData.type, fetchTmdbData);
}

export default tmdbSaga;
