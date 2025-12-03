//현재의 instance(fiber와 매칭) 상태 저장
//싱글톤

/**@type {GlobalState} */
export const GlobalState = {
  rootInstance: null, //Instance 트리 루트
  rootDom: null, //container dom
  rootElement: null, //마지막에 렌더한 vdom (element)
  currentInstance: null, //현재 렌더중인 컴포넌트 인스턴스
  hookIndex: 0, //hook 번호 저장 용 (instance 마다)
  effectList: [],
};
