//현재의 instance(fiber와 매칭) 상태 저장
//싱글톤

class GlobalState {
  #rootInstance; //Instance 트리 루트
  #rootDom; //container dom
  #rootElement; //마지막에 렌더한 vdom (element)
  #currentInstance; //현재 렌더중인 컴포넌트 인스턴스
  #hookIndex; //hook 번호 저장 용 (instance 마다)
  #effectList; //render phase 의 결과, 실행해야할 effect 목록

  constructor() {
    this.#rootInstance = null;
    this.#rootDom = null;
    this.#rootElement = null;
    this.#currentInstance = null;
    this.#hookIndex = 0;
    this.#effectList = [];
  }

  getRootInstance() {
    return this.#rootInstance;
  }

  setRootInstance(instance) {
    this.#rootInstance = instance;
  }

  getRootDom() {
    return this.#rootDom;
  }

  setRootDom(dom) {
    this.#rootDom = dom;
  }

  getRootElement() {
    return this.#rootElement;
  }

  setRootElement(element) {
    this.#rootElement = element;
  }

  getCurrentInstance() {
    return this.#currentInstance;
  }

  getCurrentInstanceHook() {
    return this.#currentInstance?.hooks;
  }

  setCurrentInstance(instance) {
    this.#currentInstance = instance;
  }

  getHookIndex() {
    return this.#hookIndex;
  }

  setHookIndex(index) {
    this.#hookIndex = index;
  }

  increaseHookIndex() {
    this.#hookIndex++;
  }

  resetHookIndex() {
    this.#hookIndex = 0;
  }

  getEffectList() {
    return this.#effectList;
  }

  setEffectList(list) {
    this.#effectList = list;
  }

  pushEffect(effect) {
    this.#effectList.push(effect);
  }

  clearEffectList() {
    this.#effectList = [];
  }
}

/**@type {GlobalState} */
export const globalState = new GlobalState();
