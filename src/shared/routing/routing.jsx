import { createElement } from "../../vdom.js";

import ArticleCreatePage from "../../pages/ArticleCreate/index.js";
import ArticleDetailPage from "../../pages/ArticleDetail/index.js";
import ArticleEditPage from "../../pages/ArticleEditor/index.js";
import ArticleListPage from "../../pages/ArticlesList/index.js";
import LoginPage from "../../pages/Login/index.js";
import SignupPage from "../../pages/Signup/index.js";
import UserEditPage from "../../pages/UserProfileEditor/index.js";

import { PATHS } from "./paths.js";

const routes = {
  [PATHS.MAIN]: () => <LoginPage />,
  [PATHS.ARTICLE_LIST]: () => <ArticleListPage />,
  [PATHS.ARTICLE_DETAIL]: () => <ArticleDetailPage />,
  [PATHS.ARTICLE_EDIT]: () => <ArticleEditPage />,
  [PATHS.ARTICLE_NEW]: () => <ArticleCreatePage />,

  [PATHS.LOGIN]: () => <LoginPage />,
  [PATHS.SIGNUP]: () => <SignupPage />,

  [PATHS.USER_EDIT_NICKNAME]: () => <UserEditPage type="nickname" />,
  [PATHS.USER_EDIT_PASSWORD]: () => <UserEditPage type="password" />,
};

const NotFoundPage = () => <div>404 Not Found</div>;

export const routing = new Proxy(routes, {
  get(target, pathname) {
    console.log("routed", pathname);
    if (pathname in target) {
      return target[pathname];
    }
    return () => <NotFoundPage />;
  },
});
