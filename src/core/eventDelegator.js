import { getHandler } from "./handlerStore.js";

let isDelegatorSetup = false;

/**
 * root에서 모든 이벤트를 위임 처리 (한번만 등록)
 * @param {HTMLElement} root
 */
export function setupEventDelegator(root) {
  if (isDelegatorSetup) return;
  isDelegatorSetup = true;

  const supportedEvents = ["click", "change", "submit"];

  supportedEvents.forEach((type) => {
    root.addEventListener(type, (e) => {
      const attrName = `data-on${type}`; //onclick과 구분하기 위해

      let el = e.target;
      while (el && el !== root) {
        const handlerId = el.getAttribute?.(attrName);
        if (handlerId) {
          const handler = getHandler(handlerId);
          if (handler) handler(e);
          break;
        }
        el = el.parentElement;
      }
    });
  });
}
