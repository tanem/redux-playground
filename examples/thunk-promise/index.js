import 'babel-polyfill';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const valueEl = document.getElementById('value');
const incrementEl = document.getElementById('increment');
const decrementEl = document.getElementById('decrement');
const incrementDoubleEl = document.getElementById('increment-double');
const decrementDoubleEl = document.getElementById('decrement-double');

const store = createStore(
  counterReducer,
  applyMiddleware(thunk)
);

const render = () => valueEl.innerHTML = store.getState().toString();
render();
store.subscribe(render);

incrementEl.addEventListener('click', () => {
  store.dispatch(incrementAsyncActionCreator());
});

decrementEl.addEventListener('click', () => {
  store.dispatch(decrementAsyncActionCreator());
});

incrementDoubleEl.addEventListener('click', () => {
  store.dispatch(incrementDoubleAsyncActionCreator());
});

decrementDoubleEl.addEventListener('click', () => {
  store.dispatch(decrementDoubleAsyncActionCreator());
});

function counterReducer(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

function incrementActionCreator() {
  return {
    type: 'INCREMENT'
  };
}

function decrementActionCreator() {
  return {
    type: 'DECREMENT'
  };
}

function incrementAsyncActionCreator() {
  return (dispatch) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dispatch(incrementActionCreator()));
      }, 1000);
    });
  };
}

function decrementAsyncActionCreator() {
  return (dispatch) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dispatch(decrementActionCreator()));
      }, 1000);
    });
  };
}

function incrementDoubleAsyncActionCreator() {
  return (dispatch) => {
    return dispatch(incrementAsyncActionCreator())
      .then(() => {
        return dispatch(incrementAsyncActionCreator());
      });
  };
}

function decrementDoubleAsyncActionCreator() {
  return (dispatch) => {
    return dispatch(decrementAsyncActionCreator())
      .then(() => {
        return dispatch(decrementAsyncActionCreator());
      });
  };
}
