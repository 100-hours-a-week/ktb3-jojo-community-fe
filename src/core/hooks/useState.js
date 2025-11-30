import { GlobalState } from "../GlobalState.js";
import { render } from "../render.js";

/**
 * @description - useState hook
 * @param {any} initialValue
 * @returns
 */

export function useState(initialValue) {
  const hooks = GlobalState.currentInstance.hooks;
  const stateIndex = GlobalState.hookIndex++;

  if (hooks.length <= stateIndex) {
    hooks[stateIndex] = initialValue;
  }

  const setState = (newValue) => {
    const prev = hooks[stateIndex];
    hooks[stateIndex] =
      typeof newValue === "function" ? newValue(prev) : newValue;

    console.log(GlobalState, prev);
    if (Object.is(prev, newValue)) return;

    if (GlobalState.rootDom && GlobalState.rootElement) {
      render(GlobalState.rootElement, GlobalState.rootDom);
    }
  };

  return [hooks[stateIndex], setState];
}
