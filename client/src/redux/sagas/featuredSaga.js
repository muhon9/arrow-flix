import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import requestUrls from "../../requestUrls";
import {
  featuredError,
  getFeatured,
  setFeatured,
} from "../featured/featuredSlice";

function* getFeaturedMovies() {
  try {
    const res = yield axios.get(requestUrls.fetchTrendingAll);
    yield put(setFeatured(res.data.results));
  } catch (error) {
    yield put(featuredError(error));
  }
}

function* featuredSaga() {
  yield takeLatest(getFeatured.type, getFeaturedMovies);
}

export default featuredSaga;
