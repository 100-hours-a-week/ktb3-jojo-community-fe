let state = {
  isLoggedIn: false,
  user: null,
};

const listeners = new Set();

export const AuthStore = {
  getState() {
    return state;
  },
  /**
   * @param {(nextState: typeof state) => void} listener
   * @returns {() => void}
   */
  subscribe(listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  notify(next) {
    state = { ...state, ...next };
    listeners.forEach((listener) => listener(state));
  },
};
