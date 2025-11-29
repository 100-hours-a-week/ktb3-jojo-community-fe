import { GlobalState } from "../GlobalState.js";
import { reconciler } from "../reconciler/reconciler.js";

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
      reconciler(
        GlobalState.rootDom,
        GlobalState.currentInstance,
        GlobalState.rootElement
      );
    }
  };

  return [hooks[stateIndex], setState];
}
