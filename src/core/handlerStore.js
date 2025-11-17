let handlerSeq = 0;
const handlerMap = new Map();

//고유 아이디로 핸들러 등록 후 id 반환
export function registerHandler(fn) {
  const id = `handler_${handlerSeq++}`;
  handlerMap.set(id, fn);
  console.log(handlerMap);
  return id;
}

//id로 핸들러 찾기
export function getHandler(id) {
  return handlerMap.get(id);
}
