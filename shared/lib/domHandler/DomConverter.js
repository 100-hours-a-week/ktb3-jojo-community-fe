/**
 * @ 문자열을 노드로 변경하는 domHandler
 * @param {*} param0
 */

export function DomConverter(context) {
  const range = document.createRange();
  const fragment = range.createContextualFragment(context);
  return fragment;
}

export function AttachDomToRoot({ rootId, fragment }) {
  const root = document.getElementById(rootId);
  root.appendChild(fragment);
}
