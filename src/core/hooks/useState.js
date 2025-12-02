import { GlobalState } from "../GlobalState.js";
import { render } from "../render.js";
import { createStateHook } from "./util/createHook.js";

/**
 * @description - useState hook
 * @param {any} initialValue
 * @returns
 */

export function useState(initialValue) {
  // console.log(
  //   "useState - GlobalState",
  //   JSON.parse(JSON.stringify(GlobalState))
  // );
  const hooks = GlobalState.currentInstance.hooks;
  const stateIndex = GlobalState.hookIndex++;
  if (hooks.length <= stateIndex) {
    hooks[stateIndex] = createStateHook(initialValue);
  }

  const setState = (newValue) => {
    const prev = hooks[stateIndex].value;
    const next = typeof newValue === "function" ? newValue(prev) : newValue;

    if (Object.is(prev, next)) return;

    hooks[stateIndex].value = next;

    if (GlobalState.rootDom && GlobalState.rootElement) {
      render(GlobalState.rootElement, GlobalState.rootDom);
    }
    // console.log(
    //   "setState - GlobalState",
    //   JSON.parse(JSON.stringify(GlobalState)),
    //   "hooks",
    //   hooks,
    //   "stateIndex",
    //   stateIndex
    // );

    // if (currentInstance.element && currentInstance.dom) {
    //   render(currentInstance.element, currentInstance.dom);
    // }
  };

  return [hooks[stateIndex].value, setState];
}
