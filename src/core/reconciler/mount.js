import { reconciler } from "./reconciler.js";
import { attachDomProps } from "./attachDomProps.js";
import { reconcileComponentInstance } from "./reconcileComponentInstance.js";

/**
 *
 * @param {VDom} element
 * @returns {Instance}
 */
function createNewInstance(element) {
  return {
    element,
    dom: null,
    childInstances: [],
    hooks: [],
  };
}

/**
 * @description - root instance mount 단계, instance 를 새로 생성 후 parent 에 붙임
 * @param {HTMLElement} parentDom
 * @param {VDom} element
 * @returns {Instance}
 */

export function mount(parentDom, element) {
  //Component instance
  if (typeof element.type === "function") {
    const instance = createNewInstance(element);

    reconcileComponentInstance(parentDom, instance, element);

    return instance;
  }

  //텍스트
  if (element.type === "TEXT_ELEMENT") {
    const dom = document.createTextNode(element.props.nodeValue ?? "");
    parentDom.appendChild(dom);

    return {
      element,
      dom,
      childInstances: [],
      hooks: [],
    };
  }

  //Host instance (htmlelement tag)
  const dom = document.createElement(element.type);

  attachDomProps(dom, {}, element.props ?? {});

  const childInstances = [];
  (element.children || []).forEach((childElement) => {
    const childInstance = reconciler(dom, null, childElement);
    if (childInstance) childInstances.push(childInstance);
  });

  parentDom.appendChild(dom);

  return {
    element,
    dom,
    childInstances,
    hooks: [],
  };
}
