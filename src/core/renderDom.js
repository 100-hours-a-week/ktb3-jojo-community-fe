//html string -> DocumentFragment (dom)
//TODO: tag 규칙 잘못되면 error 띄우기
function htmlToFragment(html) {
  const range = document.createRange();
  const fragment = range.createContextualFragment(html);
  return fragment.firstElementChild;
}

function extractDataProps(obj) {
  const result = {};

  for (const key in obj) {
    if (key.startsWith("data-prop-")) {
      const propName = key.replace("data-prop-", "");
      result[propName] = obj[key];
    }
  }

  return result;
}

// DOM → vNode
function domToVNode(dom) {
  const props = {};
  const children = [];

  if (dom?.nodeType === Node.TEXT_NODE) {
    const text = dom.nodeValue;
    if (text.trim() === "") return null;
    return text;
  }

  if (dom?.nodeType === Node.ELEMENT_NODE) {
    for (const attr of dom.attributes) {
      props[attr.name] = attr.value;
    }

    //자식 노드 순회
    dom.childNodes.forEach((child) => {
      const vChild = domToVNode(child);
      if (vChild !== null) children.push(vChild);
    });

    if (props["data-component"]) {
      const name = props["data-component"];
      const key = props["data-key"] || null;

      return {
        nodeType: "component",
        name,
        key,
        props: extractDataProps(props),
      };
    }

    return {
      nodeType: "element",
      tagName: dom.tagName.toLowerCase(),
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
// ComponentManager가 필요하므로 인자로 받는다
export function renderDom(vNode, manager) {
  // 텍스트
  if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(String(vNode));
  }

  // 컴포넌트 노드
  if (vNode.nodeType === "component") {
    const { name, key, props } = vNode;

    //여기서 자식 컴포넌트 인스턴스를 manager에게 요청
    const instance = manager.getOrCreateChildInstance(name, key, props);

    // 자식 컴포넌트 render → vNode → 재귀적으로 DOM 생성
    const childVNode = instance.render();
    const dom = renderDom(childVNode, manager);
    instance.rootDom = dom;
    return dom;
  }

  // 일반 엘리먼트
  if (vNode.nodeType === "element") {
    const element = document.createElement(vNode.tagName);

    const props = vNode.props ?? {};
    for (const [key, value] of Object.entries(props)) {
      element.setAttribute(key, value);
    }

    (vNode.children ?? []).forEach((child) => {
      element.appendChild(renderDom(child, manager));
    });

    return element;
  }
}
