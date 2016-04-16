import store from './store';
import { incrementAsync, decrementAsync } from './actions';

const valueEl = document.getElementById('value');
const incrementEl = document.getElementById('increment');
const decrementEl = document.getElementById('decrement');

render();
store.subscribe(render);

incrementEl.addEventListener('click', () => {
  store.dispatch(incrementAsync(1000));
});

decrementEl.addEventListener('click', () => {
  store.dispatch(decrementAsync(1000));
});

function render() {
  valueEl.innerHTML = store.getState().toString();
}
