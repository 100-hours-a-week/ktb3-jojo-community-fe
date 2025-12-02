import { GlobalState } from "../GlobalState.js";
import { mount } from "./mount.js";
import { unmount } from "./unmount.js";
import { updateComponentInstance, updateHostInstance } from "./update.js";

/**
 * @description - 이전 instance 와 새 element 비교 (계산 단계)
 * @param {HTMLElement} parentDom
 * @param {Instance} instance
 * @param {VDom} element
 * @returns {Instance}
 */

export function reconciler(parentDom, instance, element) {
  //[unmount]
  if (element === undefined || element === null) {
    if (instance?.dom) {
      unmount(parentDom, instance);
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

  //[mount]
  //첫
  if (!instance) {
    return mount(parentDom, element);
  }

  //루트부터 type 다르면 인스턴스 버리고 다시 mount
  if (instance.element.type !== element.type) {
    if (instance.dom) {
      unmount(parentDom, instance);
    }

    return mount(parentDom, element);
  }

  //[update]

  //Component
  if (typeof element.type === "function") {
    return updateComponentInstance(parentDom, instance, element);
  } else {
    //host dom, text dom
    return updateHostInstance(parentDom, instance, element);
  }
}
