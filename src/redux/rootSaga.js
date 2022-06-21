import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import requestUrls from "../requestUrls";
import { getFeatured, setFeatured } from "./featured/featuredSlice";

function* getFeaturedMovies() {
  const res = yield axios.get(requestUrls.fetchTrendingAll);

  yield put(setFeatured(res.data.results));
}

function* rootSaga() {
  yield takeLatest(getFeatured.type, getFeaturedMovies);
}

export default rootSaga;
