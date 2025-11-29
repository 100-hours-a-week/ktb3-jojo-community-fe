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
  GlobalState.rootInstance = reconciler(container, null, element);
}
