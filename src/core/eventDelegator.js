/**
 * 이벤트 위임을 통해 root에서 모든 이벤트를 처리하는 함수
 * @param {HTMLElement} root - 이벤트를 위임받을 루트 DOM
 */
export function eventDelegator(root) {
  const eventsMap = {}; //클로저

  function on(selector, eventType = "click", handler) {
    if (!eventsMap[eventType]) {
      eventsMap[eventType] = [];

      root.addEventListener(eventType, (e) => {
        const target = e.target;

        for (const { selector, handler } of eventsMap[eventType]) {
          const matched = target.closest(selector);
          if (matched && root.contains(matched)) {
            handler(e, matched);
          }
        }
      });
    }

    eventsMap[eventType].push({ selector, handler });
  }

  return { on };
}
