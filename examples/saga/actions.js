export function incrementAsync(delay) {
  return {
    type: 'INCREMENT_ASYNC',
    payload: {
      delay
    }
  };
}

export function decrementAsync(delay) {
  return {
    type: 'DECREMENT_ASYNC',
    payload: {
      delay
    }
  };
}

export function increment() {
  return {
    type: 'INCREMENT'
  };
}

export function decrement() {
  return {
    type: 'DECREMENT'
  };
}