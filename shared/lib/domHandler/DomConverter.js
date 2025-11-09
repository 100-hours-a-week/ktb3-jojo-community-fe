/**
 * @ 문자열을 노드로 변경하는 domHandler
 * @param {*} param0
 */

export function domConverter(context) {
  const range = document.createRange();
  const fragment = range.createContextualFragment(context);
  return fragment;
}

export function attachDomToRoot({ rootId, fragment }) {
  const root = document.getElementById(rootId);
  root.appendChild(fragment);
}
