// import { all, call, put, takeLatest } from "redux-saga/effects";

// async function gTodo() {
//   const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
//   const data = await response.json();

//   return data;
// }

// const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// function* handleAsnc() {
//   yield call(delay, 100);
//   yield put(increment());
// }

// function* handleTodo() {
//   const todo = yield call(gTodo);
//   console.log(todo);
//   yield put(setTodo(todo));
// }

// function* countSaga() {
//   yield takeLatest(incrementAsnc.type, handleAsnc);
// }

// function* todoSaga() {
//   yield takeLatest(getTodo.type, handleTodo);
// }

function* rootSaga() {}

export default rootSaga;
