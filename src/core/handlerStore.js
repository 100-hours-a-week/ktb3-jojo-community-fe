let handlerSeq = 0;
const handlerMap = new Map();

//고유 아이디로 핸들러 등록 후 id 반환
export function registerHandler(owner, eventType, handler) {
  const id = `handler_${handlerSeq++}`;
  handlerMap.set(id, { owner, eventType, handler });
  return id;
}

//id로 핸들러 찾기
export function getHandler(id) {
  return handlerMap.get(id);
}
