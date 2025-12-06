import { createElement } from "../../vdom.js";

import ArticleCreatePage from "../../pages/ArticleCreate/index.js";
import ArticleDetailPage from "../../pages/ArticleDetail/index.js";
import ArticleEditPage from "../../pages/ArticleEditor/index.js";
import ArticleListPage from "../../pages/ArticlesList/index.js";
import LoginPage from "../../pages/Login/index.js";
import SignupPage from "../../pages/Signup/index.js";
import UserEditPage from "../../pages/UserProfileEditor/index.js";

import { PATHS } from "./paths.js";

const routes = [
  { path: PATHS.MAIN, component: () => <LoginPage /> },
  { path: PATHS.ARTICLE_LIST, component: () => <ArticleListPage /> },
  {
    path: PATHS.ARTICLE_DETAIL,
    component: (params) => <ArticleDetailPage params={params} />,
  },
  {
    path: PATHS.ARTICLE_EDIT,
    component: (params) => <ArticleEditPage params={params} />,
  },
  { path: PATHS.ARTICLE_NEW, component: () => <ArticleCreatePage /> },

  { path: PATHS.LOGIN, component: () => <LoginPage /> },
  { path: PATHS.SIGNUP, component: () => <SignupPage /> },

  {
    path: PATHS.USER_EDIT_NICKNAME,
    component: () => <UserEditPage type="nickname" />,
  },
  {
    path: PATHS.USER_EDIT_PASSWORD,
    component: () => <UserEditPage type="password" />,
  },
];

const NotFoundPage = () => <div>404 Not Found</div>;

const stripHash = (path = "") => path.replace(/^#/, "");
const normalizePath = (path) =>
  typeof path === "function" ? path() : path || "#/";

function matchPath(pattern, pathname) {
  const normalizedPattern = stripHash(normalizePath(pattern));
  const normalizedPath = stripHash(pathname || "#/");

  const patternSeg = normalizedPattern.split("/").filter(Boolean);
  const pathSeg = normalizedPath.split("/").filter(Boolean);

  if (patternSeg.length !== pathSeg.length) return null;

  const params = {};

  for (let i = 0; i < patternSeg.length; i++) {
    const pat = patternSeg[i];
    const cur = pathSeg[i];

    if (pat.startsWith(":")) {
      const key = pat.slice(1);
      params[key] = decodeURIComponent(cur);
    } else if (pat !== cur) {
      return null;
    }
  }

  return params;
}

export function resolveRoute(pathname) {
  for (const route of routes) {
    const params = matchPath(route.path, pathname);
    if (params !== null) {
      return { render: route.component, params };
    }
  }

  return { render: () => <NotFoundPage />, params: {} };
}
