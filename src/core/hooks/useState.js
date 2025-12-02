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
    // console.log(
    //   "setState - GlobalState",
    //   JSON.parse(JSON.stringify(GlobalState)),
    //   "hooks",
    //   hooks,
    //   "stateIndex",
    //   stateIndex
    // );

    const prev = hooks[stateIndex];
    hooks[stateIndex].value =
      typeof newValue === "function" ? newValue(prev) : newValue;

    console.log(GlobalState, prev);
    if (Object.is(prev, newValue)) return;

    if (GlobalState.rootDom && GlobalState.rootElement) {
      render(GlobalState.rootElement, GlobalState.rootDom);
    }
  };

  return [hooks[stateIndex].value, setState];
}
