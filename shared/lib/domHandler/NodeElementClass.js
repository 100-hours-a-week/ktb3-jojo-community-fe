function createDom(context) {
  const range = document.createRange();
  const fragment = range.createContextualFragment(context);
  return fragment;
}

class NodeElementClass {
  #dom;

  constructor(context) {
    this.#dom = createDom(context);
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
