//현재의 instance(fiber) 상태 저장
//싱글톤

export const GlobalState = {
  /** @type {Instance} */
  rootInstance: null, //Instance 트리 루트
  /** @type {HTMLElement} */
  rootDom: null, //container dom
  /** @type {VDom} */
  rootElement: null, //마지막에 렌더한 vdom (element)
  /** @type {Instance} */
  currentInstance: null, //현재 렌더중인 컴포넌트 인스턴스
  /**@type {Number} */
  hookIndex: 0, //hook 번호 저장 용 (instance 마다)
};
