import {
  registerHandler,
  unregisterHandler,
} from "../../core/event/handlerStore.js";

/**
 * @description - host element 에서 props 를 attribute로 등록
 * @param {*} dom
 * @param {*} prevProps
 * @param {*} nextProps
 */

export function attachDomProps(dom, prevProps = {}, nextProps = {}) {
  Object.keys(prevProps).forEach((name) => {
    if (name === "children") return;

    //이전 props 중 없어진거 제거
    if (!(name in nextProps)) {
      if (name.startsWith("on")) {
        const eventType = name.slice(2).toLowerCase();
        const attrName = `data-on${eventType}`;
        const handlerId = dom.getAttribute(attrName);
        if (handlerId) {
          unregisterHandler(handlerId);
          dom.removeAttribute(attrName);
        }
      } else if (name === "className") {
        dom.removeAttribute("class");
      } else {
        //그외 attr 제거
        if (name in dom) {
          dom[name] = "";
        } else {
          dom.removeAttribute(name);
        }
      }
    }
  });

  //새로운 props 적용
  Object.keys(nextProps).forEach((name) => {
    if (name === "children") return;
    const value = nextProps[name];

    if (name.startsWith("on") && typeof value === "function") {
      const eventType = name.slice(2).toLowerCase();
      const attrName = `data-on${eventType}`;

      const oldId = dom.getAttribute(attrName);
      if (oldId) unregisterHandler(oldId);

      const id = registerHandler(value);
      dom.setAttribute(attrName, id);
    } else if (name === "className") {
      dom.setAttribute("class", value ?? "");
    } else {
      if (name in dom) {
        dom[name] = value;
      } else {
        dom.setAttribute(name, value);
      }
    }
  });
}
