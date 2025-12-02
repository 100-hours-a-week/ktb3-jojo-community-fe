import { GlobalState } from "./GlobalState.js";
import { reconciler } from "./reconciler/reconciler.js";

/**
 *
 * @param {VDom} element
 * @param {HTMLElement} container
 */
export function render(element, container) {
  GlobalState.rootDom = container;
  GlobalState.rootElement = element;
  GlobalState.effectList = [];

  GlobalState.rootInstance = reconciler(
    container,
    GlobalState.rootInstance,
    element
  );

  //커밋 이후
  const effectsList = GlobalState.effectList;
  console.log("effectsList", effectsList);
  effectsList.forEach(({ hook }) => {
    hook.cleanup?.(); //이전
    const cleanup = hook.setup?.();
    hook.cleanup = cleanup;
  });
}
