/**
 *
 * @param {Instance} instance
 */

export function unmount(instance) {
  if (!instance) return;

  cleanupInstance(instance);

  /**@type {HTMLElement} */
  const dom = instance.dom;

  console.log(instance, instance.childInstances);

  // 자식 DOM 제거
  if (Array.isArray(instance.childInstances)) {
    instance.childInstances.forEach((child) => {
      safeRemoveChild(child.dom.parentNode, child.dom);
      child.dom = null;
    });
  }
  safeRemoveChild(dom.parentNode, instance.dom);

  instance.dom = null;
}

function cleanupInstance(instance) {
  if (!instance) return;

  // effect cleanup
  if (Array.isArray(instance.hooks)) {
    instance.hooks.forEach((hook) => {
      if (hook.tag === "effect" && typeof hook.cleanup === "function") {
        hook.cleanup();
      }
    });
  }

  // 자식 재귀 cleanup
  if (Array.isArray(instance.childInstances)) {
    instance.childInstances.forEach((child) => cleanupInstance(child));
  }
}

function safeRemoveChild(parent, child) {
  if (!parent || !child) return;
  console.log("childParent", child.parentNode, parent);
  // child가 parent의 자식인지 확인
  if (Object.is(child.parentNode, parent)) {
    parent.removeChild(child);
  } else {
    throw new Error(child, parent, "자식 요소가 아닙니다.");
  }
}
