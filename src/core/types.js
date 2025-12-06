/**
 * @typedef {Object} VDom
 * @property {string | Function} type - (host element - 일반 태그를 의미)
 * @property {Object<string, any>} props
 * @property {string | null} key
 * @property {VDom[]} children
 */

/**
 * @typedef {Object} Instance - reconcile 반환 값 (fiber instance)
 * @property {VDom} element - 이전에 렌더했던 vdom (새 element 와 비교 후 diff)
 * @property {Node | null} dom - 실제 돔 참조 pointer
 * @property {Instance[]} childInstances
 * @property {any[]} hooks - useState 등 hook 들어감
 */

/**
 * @typedef {Object} GlobalState
 * @property {Instance} rootInstance - Instance 트리 루트
 * @property {HTMLElement} rootDom - container dom
 * @property {VDom} rootElement - 마지막에 렌더한 vdom
 * @property {Instance} currentInstance - 현재 렌더중인 컴포넌트 인스턴스
 * @property {Number} hookIndex - hook 번호 저장용 (instance 마다)
 * @property {Effect[]} effectList - render 중 쌓은 effectList
 */

/**
 * @typedef {Object} Effect
 * @property {Instance} instance
 * @property {Hook} hook
 */

//hook

/**
 * @typedef {"state"|"effect"} HookTag
 */

/**
 * @typedef {{
 *   tag: 'state',
 *   value: any,
 *   setup: null,
 *   deps: null,
 *   cleanup: null
 * }} StateHook
 */

/**
 * @typedef {{
 *   tag: 'effect',
 *   value: null,
 *   setup: () => (void | (() => void)),
 *   deps: any[] | undefined,
 *   cleanup: null | (() => void)
 * }} EffectHook
 */

/**
 * @typedef {StateHook | EffectHook} Hook
 */
