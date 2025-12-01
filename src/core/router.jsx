import { createElement } from "../vdom.js";

import { render } from "./render.js";
import { GlobalState } from "./GlobalState.js";
import { routing } from "../shared/routing/routing.js";

function rerenderRoot() {
  if (!GlobalState.rootElement || !GlobalState.rootDom) return;
  render(GlobalState.rootElement, GlobalState.rootDom);
}

export function RouterView() {
  const pathname = window.location.pathname;
  const createVNode = routing[pathname];

  const PageVNode = createVNode();

  return PageVNode;
}

/**
 *
 * @param {String} pathname
 * @returns
 */
export function useNavigate(pathname) {
  if (window.location.pathname === pathname) return;

  window.history.pushState({}, "", pathname);
  rerenderRoot();
}

export function setupRouterListeners() {
  window.addEventListener("popstate", () => {
    rerenderRoot();
  });
}
