export const PATHS = {
  MAIN: "/",
  ARTICLE_LIST: "/articles",
  ARTICLE_DETAIL: (articleId = ":id") => `/articles/${articleId}`,
  ARTICLE_EDIT: (articleId = ":id") => `/articles/${articleId}/edit`,
  ARTICLE_NEW: "/articles/new",

  LOGIN: "/login",
  SIGNUP: "/signup",

  USER_EDIT_NICKNAME: "/user/edit/nickname",
  USER_EDIT_PASSWORD: "/user/edit/password",
};
