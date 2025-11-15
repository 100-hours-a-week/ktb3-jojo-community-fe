import { htmlToVNode, renderDom } from "./renderDom.js";

export class ComponentClass {
  constructor(componentFunction, initialProps = {}) {
    this.componentFunction = componentFunction;
    this.props = initialProps;
    this.isMounted = false;
    this.vNode = null;
    this.root = null; //실제 dom ?
  }

  //vNode만 생성
  render() {
    const html = this.componentFunction();
    const newVNode = htmlToVNode(html);
    console.log(newVNode);
    if (!newVNode) {
      throw new Error(newVNode);
    }
    return newVNode;
  }

  //새로운 돔을 생성
  mount(selectorOrRoot) {
    if (this.isMounted) return;

    //컨테이너 찾기
    const container =
      typeof selectorOrRoot === "string"
        ? document.querySelector(selectorOrRoot)
        : selectorOrRoot;

    if (!container) {
      throw new Error(selectorOrRoot);
    }

    this.vNode = this.render();
    const dom = renderDom(this.vNode);

    //컨테이너 비우고 새 dom
    container.innerHTML = "";
    container.appendChild(dom);

    this.root = dom;
    this.isMounted = true;
  }

  update() {
    if (!this.isMounted) {
      this.mount();
      return;
    }

    const newVNode = this.render(); //render 단계
    //TODO: diff 구현 및 patch queue 반영
    //const patchQueue = diff(this.vNode, newVNode); //diff 로 patch queue 를 생성
    //한번에 patch Queue 반영 (commit)

    this.vNode = newVNode; // 최신 스냅샷 저장
  }
}
