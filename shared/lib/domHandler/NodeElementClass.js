function createDom(context) {
  const range = document.createRange();
  const fragment = range.createContextualFragment(context);
  return fragment;
}

class NodeElementClass {
  #dom;
  #eventListeners = [];

  constructor(context) {
    this.#dom = createDom(context);
  }

  /**
   * 선택자로 요소를 찾아 이벤트 리스너 등록
   */
  on(selector, eventType, handler) {
    const element = this.#dom.querySelector(selector);

    if (element) {
      element.addEventListener(eventType, handler);
      this.#eventListeners.push({
        element,
        eventType,
        handler,
      });
    }

    return this;
  }

  /**
   * 직접 dom에 이벤트 리스너 등록
   */
  onElement(element, eventType, handler) {
    if (element) {
      element.addEventListener(eventType, handler);
      this.#eventListeners.push({
        element,
        eventType,
        handler,
      });
    }

    return this;
  }

  getDom() {
    return this.#dom;
  }

  getHtml() {
    const wrapper = document.createElement("div");
    wrapper.appendChild(this.#dom.cloneNode(true));
    return wrapper.innerHTML;
  }

  setContentsByClassName({ className, contents }) {
    const target = this.#dom.querySelector(`.${className}`);
    target.textContent = contents;
  }

  setAttachDomToRoot(rootId) {
    const root = document.getElementById(rootId);
    root.appendChild(this.#dom);
  }
}

export const NodeElement = (context) => new NodeElementClass(context);
