/**
 *
 * @param {HTMLElement} parentDom
 * @param {Instance} instance
 */

export function unmount(parentDom, instance) {
  parentDom.removeChild(instance.dom);

  //cleanup 처리 (commit 후)
  instance.hooks.forEach((hook) => {
    if (hook.tag === "effect") {
      hook.cleanup?.();
    }
  });

  instance.childInstances?.forEach((hook) => {
    if (hook.tag === "effect") {
      hook.cleanup?.();
    }
  });
}
