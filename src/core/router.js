import { render } from "./render.js";
import { globalState } from "./GlobalState.js";
import { routing } from "../shared/routing/routing.js";

function rerenderRoot() {
  if (!globalState.getRootElement() || !globalState.getRootDom()) return;
  render(globalState.getRootElement(), globalState.getRootDom());
}

export function RouterView() {
  const pathname = window.location.hash;
  const createVNode = routing[pathname];

  const PageVNode = createVNode();

  return PageVNode;
}

/**
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
