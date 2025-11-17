/**
 * 이벤트 위임을 통해 root에서 모든 이벤트를 처리하는 함수
 * @param {HTMLElement} root - 이벤트를 위임받을 루트 DOM
 */
export function eventDelegator(root) {
  const eventsMap = {}; //클로저, { click: [ { selector, handler, owner } ] }

  function on(selector, eventType = "click", handler, owner = null) {
    if (!eventsMap[eventType]) {
      eventsMap[eventType] = [];
      console.log(eventsMap);

      root.addEventListener(eventType, (e) => {
        const target = e.target;
        const handlers = eventsMap[eventType];

        for (const entry of handlers) {
          const { selector, handler } = entry;
          const matched = target.closest(selector);
          if (matched && root.contains(matched)) {
            handler(e, matched);
          }
        }
      });
    }

    eventsMap[eventType].push({ selector, handler, owner });
  }

  //root에서 모든 이벤트 리스너 제거
  function clearHandlers(owner) {
    Object.keys(eventsMap).forEach((eventType) => {
      eventsMap[eventType] = eventsMap[eventType].filter(
        (entry) => entry.owner !== owner
      );
    });
  }

  return { on, clearHandlers };
}
