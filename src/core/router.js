import { render } from "./render.js";
import { globalState } from "./GlobalState.js";
import { resolveRoute } from "../shared/routing/routing.js";

function rerenderRoot() {
  if (!globalState.getRootElement() || !globalState.getRootDom()) return;
  render(globalState.getRootElement(), globalState.getRootDom());
}

export function RouterView() {
  const pathname = window.location.hash;
  const { render, params } = resolveRoute(pathname);
  const PageVNode = render?.(params) ?? null;
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
