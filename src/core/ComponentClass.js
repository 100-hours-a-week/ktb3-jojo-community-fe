import { diff } from "./diff.js";
import { htmlToVNode, renderDom } from "./renderDom.js";
import { registerHandler } from "./handlerStore.js";
import { setupEventDelegator } from "./eventDelegator.js";

export class ComponentClass {
  constructor(componentFunction, initialProps = {}) {
    this.componentFunction = componentFunction;
    this.props = initialProps;
    this.isMounted = false;
    this.vNode = null;
    this.root = null; //실제 dom ?

    this.hookOptions = {
      currentStateKey: 0,
      states: [],
    };
  }

  //vNode만 생성
  render() {
    this.hookOptions.currentStateKey = 0;
    const html = this.componentFunction.call(this, this.props);
    const newVNode = htmlToVNode(html);
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

    // 루트에 이벤트 위임 한 번만 세팅
    setupEventDelegator(container);

    this.vNode = this.render();
    const dom = renderDom(this.vNode);

    //컨테이너 비우고 새 dom
    container.innerHTML = "";
    container.appendChild(dom);

    this.root = dom;
    this.isMounted = true;

    console.log("mounted");
  }

  unmount() {
    if (!this.isMounted) return;

    //dom 에서 root 제거
    if (this.root && this.root.parentNode) {
      this.root.parentNode.removeChild(this.root);
    }

    //초기화
    this.isMounted = false;
    this.vNode = null;
    this.root = null;

    this.hookOptions = {
      currentStateKey: 0,
      states: [],
    };
  }

  update() {
    if (!this.isMounted) {
      return;
    }
    const newVNode = this.render();

    const patch = diff(this.vNode, newVNode);

    // root dom을 넘겨줌
    this.root = patch(this.root);

    this.vNode = newVNode;
  }

  useState(initState) {
    const key = this.hookOptions.currentStateKey;

    //최초 호출일 때만 초기값
    if (this.hookOptions.states.length === key) {
      this.hookOptions.states.push(initState);
    }

    const state = this.hookOptions.states[key];

    const setState = (next) => {
      console.log(next);
      const prev = this.hookOptions.states[key];
      const value = next;
      //렌더 패스
      if (Object.is(prev, value)) return;

      this.hookOptions.states[key] = value;

      //rerender
      this.update();
    };

    // 다음 useState를 위해 key 증가
    this.hookOptions.currentStateKey += 1;

    return [state, setState];
  }

  /**
   * 컴포넌트 내부에서 이벤트 핸들러를 등록
   * @param {*} eventType
   * @param {&} handler
   * @returns {string} handlerId (data-on${eventType}에 넣을 값)
   */
  registerHandler(eventType, handler) {
    const id = registerHandler(handler);
    return id;
  }
}
