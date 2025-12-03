/**
 *
 * @param {HTMLElement} parentDom
 * @param {Instance} instance
 */

export function unmount(parentDom, instance) {
  console.log("unmount", parentDom, instance);
  cleanupInstance(instance);
  parentDom.removeChild(instance.dom);
}

function cleanupInstance(instance) {
  //cleanup 처리 (commit 후)
  instance.hooks.forEach((hook) => {
    if (hook.tag === "effect") {
      hook.cleanup?.();
    }
  });

  instance.childInstances?.forEach((instance) => {
    cleanupInstance(instance);
  });
  instance = null;
}
