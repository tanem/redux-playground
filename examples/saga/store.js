import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { counter } from './reducers';
import { incrementAsyncSaga, decrementAsyncSaga } from './sagas';

const sagas = createSagaMiddleware(incrementAsyncSaga, decrementAsyncSaga);

export default createStore(counter, applyMiddleware(sagas));