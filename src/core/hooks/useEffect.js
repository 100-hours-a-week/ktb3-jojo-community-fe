import { GlobalState } from "../GlobalState.js";
import { createEffectHook } from "./util/createHook.js";
/**
 *
 * @param {Function} setup
 * @param {any[]} deps
 */

export function useEffect(setup, deps) {
  const instance = GlobalState.currentInstance;
  const hookIndex = GlobalState.hookIndex++;

  const prevHook = instance.hooks[hookIndex];

  /**@typedef {Hook} */
  const newHook = createEffectHook({ setup, deps, cleanup: prevHook?.cleanup });

  instance.hooks[hookIndex] = newHook;

  if (prevHook && isSame(deps, prevHook.deps)) return;

  GlobalState.effectList.push({
    instance,
    hook: newHook,
  });
}

/**
 * @description - Object.is 로 의존성 참조 같은지 비교
 * @param {*} deps
 * @param {*} preDeps
 * @returns
 */
function isSame(deps, preDeps) {
  let flag = true;

  deps.forEach((element, idx) => {
    if (!Object.is(element, preDeps[idx])) {
      flag = false;
      return;
    }
  });

  return flag;
}
