import { GlobalState } from "../GlobalState.js";
import { mount } from "./mount.js";
import { updateComponentInstance, updateHostInstance } from "./update.js";

/**
 * @description - 이전 instance 와 새 element 비교 (계산 단계)
 * @param {HTMLElement} parentDom
 * @param {Instance} instance
 * @param {VDom} element
 * @returns {Instance}
 */

export function reconciler(parentDom, instance, element) {
  console.log(GlobalState);

  //TODO: [unmount]
  if (element === null || element === undefined) {
    if (instance && instance.dom) {
      parentDom.removeChild(instance.dom);
    }
    return null;
  }

  //문자/숫자
  if (typeof element === "string" || typeof element === "number") {
    const textElement = {
      type: "TEXT_ELEMENT",
      props: { nodeValue: element },
      key: null,
      children: [],
    };

    element = textElement;
  }

  console.log("instance", instance, "element", element);

  //[mount]
  //첫
  if (!instance) {
    console.log("mount", element);
    return mount(parentDom, element);
  }

  //루트부터 type 다르면 인스턴스 버리고 다시 mount
  if (instance.element.type !== element.type) {
    console.log("mount", instance.element.type, element.type);
    if (instance.dom) {
      parentDom.removeChild(instance.dom);
    }

    return mount(parentDom, element);
  }

  //[update]

  //Component
  if (typeof element.type === "function") {
    return updateComponentInstance(parentDom, instance, element);
  } else {
    //host dom
    console.log("update", element);
    return updateHostInstance(parentDom, instance, element);
  }
}
