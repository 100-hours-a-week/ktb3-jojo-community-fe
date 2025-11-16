import { renderDom } from "./renderDom.js";

export function diff(oldVNode, newVNode) {
  //타입이 다르면: 해당 DOM 노드 자체 교체
  if (oldVNode?.type !== newVNode?.type) {
    return (dom) => {
      const newDom = renderDom(newVNode);
      console.log(dom, newDom);
      dom.replaceWith(newDom);
      return newDom;
    };
  }

  //텍스트 노드 비교
  if (typeof oldVNode === "string" || typeof newVNode === "string") {
    if (oldVNode !== newVNode) {
      return (dom) => {
        const newDom = renderDom(newVNode);
        console.log(dom, newDom);
        dom.replaceWith(newDom);
        return newDom;
      };
    }
    return (dom) => dom;
  }

  //여기부터는 같은 타입의 엘리먼트
  return (dom) => {
    const oldProps = oldVNode.props || {};
    const newProps = newVNode.props || {};

    // props patch
    for (const [k, v] of Object.entries(newProps)) {
      if (oldProps[k] !== v) {
        dom.setAttribute(k, v);
      }
    }
    for (const k of Object.keys(oldProps)) {
      if (!(k in newProps)) {
        dom.removeAttribute(k);
      }
    }

    //children patch
    const oldChildren = oldVNode.children || [];
    const newChildren = newVNode.children || [];
    const max = Math.max(oldChildren.length, newChildren.length);

    for (let i = 0; i < max; i++) {
      const oldChild = oldChildren[i];
      const newChild = newChildren[i];
      const childDom = dom.childNodes[i];

      if (!oldChild && newChild) {
        dom.appendChild(renderDom(newChild));
      } else if (oldChild && !newChild) {
        dom.removeChild(childDom);
      } else if (oldChild && newChild) {
        const patch = diff(oldChild, newChild);
        patch(childDom);
      }
    }

    return dom;
  };
}
