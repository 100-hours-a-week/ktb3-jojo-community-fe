//html string -> DocumentFragment (dom)
function htmlToFragment(html) {
  const range = document.createRange();
  const fragment = range.createContextualFragment(html);
  return fragment.firstElementChild;
}

//DOM → vNode
function domToVNode(dom) {
  console.log(dom);
  const props = {};
  const children = [];

  if (dom.nodeType === Node.TEXT_NODE) {
    const text = dom.nodeValue;
    if (text.trim() === "") return null;
    return text;
  }

  if (dom.nodeType === Node.ELEMENT_NODE) {
    console.log(dom.attributes);
    for (const attr of dom.attributes) {
      props[attr.name] = attr.value;
    }

    //자식 노드 순회
    dom.childNodes.forEach((child) => {
      const vChild = domToVNode(child);
      if (vChild !== null) children.push(vChild);
    });

    return {
      type: dom.tagName.toLowerCase(),
      props,
      children,
    };
  }

  console.error("어떤 노드 타입도 아님", dom);
  return null;
}

export function htmlToVNode(html) {
  const domFrag = htmlToFragment(html);
  return domToVNode(domFrag);
}

//vNode → 실제 dom
//임시...
export function renderDom(vNode) {
  //textnode일 때
  if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(String(vNode));
  }

  const element = document.createElement(vNode.type); //TODO: 방식 확인

  for (const [key, value] of Object.entries(vNode.props ?? {})) {
    element.setAttribute(key, value);
  }

  (vNode.children ?? []).forEach((child) => {
    element.appendChild(renderDom(child));
  });

  return element;
}
