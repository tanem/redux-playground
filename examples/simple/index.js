import store from './store';
import { increment, decrement } from './actions';

const valueEl = document.getElementById('value');
const incrementEl = document.getElementById('increment');
const decrementEl = document.getElementById('decrement');

render();
store.subscribe(render);

incrementEl.addEventListener('click', () => store.dispatch(increment()));
decrementEl.addEventListener('click', () => store.dispatch(decrement()));

function render() {
  valueEl.innerHTML = store.getState().toString();
}
