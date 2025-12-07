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
 * @param {Object} options - Navigation options
 * @param {Boolean} options.replace - If true, replaces current history entry instead of pushing new one
 * @returns
 */
export function useNavigate(pathname, options = {}) {
  if (window.location.pathname === pathname) return;

  if (options.replace) {
    window.history.replaceState({}, "", pathname);
  } else {
    window.history.pushState({}, "", pathname);
  }
  rerenderRoot();
}

export function setupRouterListeners() {
  window.addEventListener("popstate", () => {
    rerenderRoot();
  });
}
