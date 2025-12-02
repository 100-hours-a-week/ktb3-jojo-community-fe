import { GlobalState } from "../GlobalState.js";
import { attachDomProps } from "./attachDomProps.js";
import { reconciler } from "./reconciler.js";
/**
 * @description - 함수 컴포넌트 업데이트
 * @param {HTMLElement} parentDom
 * @param {Instance} instance
 * @param {VDom} element
 * @returns
 */

export function updateComponentInstance(parentDom, instance, element) {
  instance.element = element;

  GlobalState.currentInstance = instance;
  GlobalState.hookIndex = 0;

  const childElement = element.type(element.props ?? {});

  const oldChildInstance = instance.childInstances[0] || null;
  const childInstance = reconciler(parentDom, oldChildInstance, childElement);

  instance.childInstances = childInstance ? [childInstance] : [];
  instance.dom = childInstance?.dom ?? null;

  return instance;
}

/**
 * @description - host element 업데이트
 * @param {HTMLElement} parentDom
 * @param {Instance} instance
 * @param {VDom} element
 * @returns
 */

export function updateHostInstance(parentDom, instance, element) {
  //텍스트 노드 업데이트
  if (element.type === "TEXT_ELEMENT") {
    if (instance.dom.nodeValue !== element.props.nodeValue) {
      instance.dom.nodeValue = element.props.nodeValue ?? "";
      console.log("text_node_udpated", instance.dom);
    }
    instance.element = element;
    return instance;
  }

  const dom = instance.dom;

  attachDomProps(dom, instance.element.props ?? {}, element.props ?? {});

  instance.element = element;

  const oldChildInstances = instance.childInstances;
  const newChildElements = element.children || [];

  const newChildInstances = [];
  const maxLen = Math.max(oldChildInstances.length, newChildElements.length);

  for (let i = 0; i < maxLen; i++) {
    const childInstance = reconciler(
      dom,
      oldChildInstances[i],
      newChildElements[i]
    );
    if (childInstance) newChildInstances.push(childInstance);
  }

  instance.childInstances = newChildInstances;
  console.log("updatedInstance", instance, element);
  return instance;
}
