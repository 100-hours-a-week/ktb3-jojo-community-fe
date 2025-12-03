/**
 * @param {any} initialValue
 * @returns {StateHook}
 */
export function createStateHook(initialValue) {
  return {
    tag: "state",
    value: initialValue,
    setup: null,
    deps: null,
    cleanup: null,
  };
}

/**
 * @returns {EffectHook}
 */
export function createEffectHook({ setup, deps, cleanup }) {
  return {
    tag: "effect",
    value: null,
    setup,
    deps,
    cleanup: cleanup ?? null,
  };
}
