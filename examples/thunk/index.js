import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const valueEl = document.getElementById('value');
const incrementEl = document.getElementById('increment');
const decrementEl = document.getElementById('decrement');

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
    setTimeout(() => dispatch(incrementActionCreator()), 1000);
  };
}

function decrementAsyncActionCreator() {
  return (dispatch) => {
    setTimeout(() => dispatch(decrementActionCreator()), 1000);
  };
}
