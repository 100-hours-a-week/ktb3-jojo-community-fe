/**
 * @typedef {Object} VDom
 * @property {string | Function} type - (host element - 일반 태그를 의미)
 * @property {Object<string, any>} props
 * @property {string | null} key
 * @property {VDom[]} children
 */

/**
 * @typedef {Object} Instance - reconcile 반환 값 (fiber instance)
 * @property {VDom} element
 * @property {Node | null} dom
 * @property {Instance[]} childInstances
 * @property {any[]} hooks - useState 등 hook 들어감
 */
