import { globalState } from "../GlobalState.js";
import { render } from "../render.js";
import { createStateHook } from "./util/createHook.js";

/**
 * @description - useState hook
 * @param {any} initialValue
 * @returns
 */

export function useState(initialValue) {
  const hooks = globalState.getCurrentInstanceHook();
  globalState.increaseHookIndex();
  const stateIndex = globalState.getHookIndex();
  if (hooks.length <= stateIndex) {
    hooks[stateIndex] = createStateHook(initialValue);
  }

  const setState = (newValue) => {
    const prev = hooks[stateIndex].value;
    const next = typeof newValue === "function" ? newValue(prev) : newValue;

    if (Object.is(prev, next)) return;

    hooks[stateIndex].value = next;

    if (globalState.getRootDom() && globalState.getRootElement()) {
      render(globalState.getRootElement(), globalState.getRootDom());
    }

    // if (currentInstance.element && currentInstance.dom) {
    //   render(currentInstance.element, currentInstance.dom);
    // }
  };

  return [hooks[stateIndex].value, setState];
}
