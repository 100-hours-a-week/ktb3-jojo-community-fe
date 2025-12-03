import { GlobalState } from "../GlobalState.js";
import { reconciler } from "./reconciler.js";
import { attachDomProps } from "./attachDomProps.js";

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

    //globalState 초기화
    //TODO: globalstate class 로 관리
    GlobalState.currentInstance = instance;
    GlobalState.hookIndex = 0;

    const childElement = element.type(element.props ?? {}); //vdom
    const childInstance = reconciler(parentDom, null, childElement); //재귀

    instance.childInstances = childInstance ? [childInstance] : [];
    instance.dom = childInstance?.dom ?? null;
    console.log("component_node_mount", instance?.dom);

    return instance;
  }

  //텍스트
  if (element.type === "TEXT_ELEMENT") {
    const dom = document.createTextNode(element.props.nodeValue ?? "");
    console.log("text_node_mount", dom);
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
  (element.children || []).forEach((child) => {
    const childInstance = reconciler(dom, null, child);
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
