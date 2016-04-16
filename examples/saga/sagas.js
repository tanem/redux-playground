import 'babel-polyfill';

import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects';

import { increment, decrement } from './actions';

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function* incrementAsyncWorkerSaga(action) {
  yield call(delay, action.payload.delay);
  yield put(increment());
}

function* decrementAsyncWorkerSaga(action) {
  yield call(delay, action.payload.delay);
  yield put(decrement());
}

export function* incrementAsyncSaga() {
  yield* takeEvery('INCREMENT_ASYNC', incrementAsyncWorkerSaga);
}

export function* decrementAsyncSaga() {
  yield* takeEvery('DECREMENT_ASYNC', decrementAsyncWorkerSaga);
}
