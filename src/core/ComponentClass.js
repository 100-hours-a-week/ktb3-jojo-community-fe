import { htmlToVNode } from "./renderDom.js";
import { registerHandler } from "./handlerStore.js";

export class ComponentClass {
  /**
   * @param {Function} componentFunction - 컴포넌트 함수 (App, Child 등)
   * @param {Object} options
   * @param {Object} options.manager - ComponentManager 인스턴스
   * @param {Object} options.initialProps
   */
  constructor(componentFunction, { manager, initialProps = {} }) {
    this.componentFunction = componentFunction;
    this.manager = manager;
    this.props = initialProps;

    this.vNode = null;
    this.rootDom = null; // 이 인스턴스가 그리는 실제 root DOM (자식일 수도 있음)

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

    this.vNode = newVNode;
    return newVNode;
  }

  // 이제 root에 직접 patch 하지 않고, manager에게 “다시 렌더해”라고 알림
  update() {
    this.manager.scheduleUpdate();
  }

  useState(initState) {
    const key = this.hookOptions.currentStateKey;

    if (this.hookOptions.states.length === key) {
      this.hookOptions.states.push(initState);
    }

    const state = this.hookOptions.states[key];

    const setState = (next) => {
      const prev = this.hookOptions.states[key];
      const value = typeof next === "function" ? next(prev) : next;

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
    return registerHandler(this, eventType, handler);
  }
}
