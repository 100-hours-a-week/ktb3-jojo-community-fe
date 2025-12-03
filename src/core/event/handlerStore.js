let handlerSeq = 0;
const handlerMap = new Map();

//고유 아이디로 핸들러 등록 후 id 반환
export function registerHandler(handler) {
  const id = `handler_${handlerSeq++}`;
  handlerMap.set(id, handler);
  return id;
}

export function unregisterHandler(id) {
  handlerMap.delete(id);
}

//id로 핸들러 찾기
/**
 *
 * @param {number} id
 * @returns {Map<number, Function>}
 */
export function getHandler(id) {
  return handlerMap.get(id);
}
