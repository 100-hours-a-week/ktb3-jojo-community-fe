import { globalState } from "./GlobalState.js";
import { reconciler } from "./reconciler/reconciler.js";

/**
 *
 * @param {VDom} element
 * @param {HTMLElement} container
 */
export function render(element, container) {
  globalState.setRootDom(container);
  globalState.setRootElement(element);

  globalState.clearEffectList();

  const renderedInstance = reconciler(
    container,
    globalState.getRootInstance(),
    element
  );
  globalState.setRootInstance(renderedInstance);

  //커밋 이후
  const effectsList = globalState.getEffectList();
  effectsList.forEach(({ hook }) => {
    hook.cleanup?.(); //이전
    const cleanup = hook.setup?.();
    hook.cleanup = cleanup;
  });
}
