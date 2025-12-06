import { globalState } from "../GlobalState.js";
import { reconciler } from "./reconciler.js";
/**
 *
 * @param {HTMLElement} parentDom
 * @param {Instance} instance
 * @param {VDom} element
 * @returns {Instance}
 */
export function reconcileComponentInstance(parentDom, instance, element) {
  globalState.prepareRenderContext(instance);

  const childElement = element.type(element.props ?? {}); //vdom
  const childInstance = reconciler(
    parentDom,
    instance?.childInstances[0] || null,
    childElement
  ); //재귀

  instance.childInstances = childInstance ? [childInstance] : [];

  if (childInstance?.dom) {
    instance.dom = childInstance.dom;
  } else {
    throw new Error("Component instance 에 dom 이 없습니다.");
  }

  return instance;
}
