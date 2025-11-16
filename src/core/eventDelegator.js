/**
 * 이벤트 위임을 통해 root에서 모든 이벤트를 처리하는 함수
 * @param {HTMLElement} root - 이벤트를 위임받을 루트 DOM
 */
export function eventDelegator(root) {
  const eventsMap = {}; //클로저, { click: [ { selector, handler } ] }

  function on(selector, eventType = "click", handler) {
    if (!eventsMap[eventType]) {
      eventsMap[eventType] = [];

      root.addEventListener(eventType, (e) => {
        const target = e.target;
        const handlers = eventsMap[eventType];

        for (const { selector, handler } of handlers) {
          const matched = target.closest(selector);
          if (matched && root.contains(matched)) {
            handler(e, matched);
          }
        }
      });
    }

    eventsMap[eventType].push({ selector, handler });
  }

  //root에서 모든 이벤트 리스너 제거
  function clearHandlers() {
    for (const [eventType, { listener }] of Object.entries(eventsMap)) {
      if (listener) {
        root.removeEventListener(eventType, listener);
      }
    }
  }

  return { on, clearHandlers };
}
