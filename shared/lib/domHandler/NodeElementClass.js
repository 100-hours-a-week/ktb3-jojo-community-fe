function createDom(context) {
  const range = document.createRange();
  const fragment = range.createContextualFragment(context);
  return fragment.firstElementChild;
}

class NodeElementClass {
  #dom;
  #eventListeners = [];

  constructor(context) {
    this.#dom = createDom(context);
  }

  /**
   * @description 이벤트 리스너 등록
   * @param {string} selector
   * @param {"click"|"submit"|"scroll"} eventType //TODO: 더 세분화
   * @param {(element) => {}} handler
   * @returns
   */
  on(selector, eventType, handler) {
    const element = this.#dom.querySelector(selector);

    element?.addEventListener(eventType, handler);
    this.#eventListeners.push({
      selector,
      eventType,
      handler,
    });

    return this;
  }

  // /**
  //  * 직접 dom에 이벤트 리스너 등록
  //  */
  // onElement(element, eventType, handler, selector) {
  //   if (element) {
  //     element.querySelector(selector).addEventListener(eventType, handler);
  //     this.#eventListeners.push({
  //       element,
  //       eventType,
  //       handler,
  //     });
  //   }

  //   return this;
  // }

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

  /**
   *
   * @param {string} selector
   * @param {NodeElementClass} element
   */

  attachDomToSlot(selector, element) {
    const regex = /^\./;
    const slotSelector = selector.match(regex) ? selector : `.${selector}`;
    const slot = this.#dom.querySelector(slotSelector);
    slot?.appendChild(element.getDom());
  }

  /**
   * 이벤트 재바인딩, 리렌더링 후 필수적
   */
  rebindEventListener() {
    this.#eventListeners.forEach((listener) => {
      const [selector, eventType, handler] = listener;
      const element = this.#dom.querySelector(selector);
      element.addEventListener(eventType, handler);
    });
  }

  rerender(context) {
    const newDom = createDom(context);
    if (this.#dom.parentNode) {
      this.#dom.parentNode.replaceChild(newDom, this.#dom);
    }
    this.#dom = newDom;
    this.rebindEventListener();
  }

  mount(rootId) {
    const root = document.getElementById(rootId);
    root.appendChild(this.#dom);
  }
}

export const NodeElement = (context) => new NodeElementClass(context);
