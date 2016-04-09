import { combineReducers, createStore, applyMiddleware } from 'redux';
import optimist, {BEGIN, COMMIT, REVERT} from 'redux-optimist';

const valueEl = document.getElementById('value');
const incrementSuccessfulEl = document.getElementById('increment-successful');
const incrementFailedEl = document.getElementById('increment-failed');

const store = createStore(
  optimist(combineReducers({ counter: counterReducer })),
  applyMiddleware(
    incrementSuccessfulMiddleware(),
    incrementFailedMiddleware()
  )
);

const render = () => valueEl.innerHTML = store.getState().counter.toString();
render();
store.subscribe(render);

incrementSuccessfulEl.addEventListener('click', () => {
  store.dispatch(incrementSuccessfulActionCreator());
});

incrementFailedEl.addEventListener('click', () => {
  store.dispatch(incrementFailedActionCreator());
});

function counterReducer(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    default:
      return state
  }
}

function incrementSuccessfulActionCreator() {
  return {
    type: 'INCREMENT_SUCCESSFUL'
  };
}

function incrementFailedActionCreator() {
  return {
    type: 'INCREMENT_FAILED'
  };
}

function incrementSuccessfulMiddleware() {
  return (store) => (next) => (action) => {
    if (action.type !== 'INCREMENT_SUCCESSFUL') {
      return next(action);
    }
    let transactionID = getTransactionID
    next({
      type: 'INCREMENT',
      optimist: { type: BEGIN, id: transactionID }
    });
    setTimeout(() => {
      next({
        type: 'INCREMENT_COMPLETE',
        optimist: {type: COMMIT, id: transactionID}
      });
    }, 1000);
  };
}

function incrementFailedMiddleware() {
  return (store) => (next) => (action) => {
    if (action.type !== 'INCREMENT_FAILED') {
      return next(action);
    }
    let transactionID = getTransactionID();
    next({
      type: 'INCREMENT',
      optimist: { type: BEGIN, id: transactionID }
    });
    setTimeout(() => {
      next({
        type: 'INCREMENT_FAILED',
        optimist: {type: REVERT, id: transactionID}
      });
    }, 1000);
  };
}

let nextTransactionID = 0;
function getTransactionID() {
  return nextTransactionID++;
}
