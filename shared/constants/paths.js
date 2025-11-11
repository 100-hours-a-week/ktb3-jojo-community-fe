const BASE_PATH = "/pages";

export const PATHS = {
  ARTICLE_DETAIL: {
    ABSOLUTE: (articleId) =>
      `${BASE_PATH}/ArticleDetail/articleDetail.html?articleId=${articleId}`,
  },
  ARTICLE_EDITOR: {
    ABSOLUTE: `${BASE_PATH}/ArticleEditor/articleEditor.html`,
    PUT: (articleId) =>
      `${BASE_PATH}/ArticleEditor/articleEditor.html?articleId=${articleId}`,
  },
  ARTICLES_LIST: {
    ABSOLUTE: `${BASE_PATH}/ArticlesList/articlesList.html`,
  },
  LOGIN: {
    ABSOLUTE: `${BASE_PATH}/Login/login.html`,
  },
  SIGNUP: {
    ABSOLUTE: `${BASE_PATH}/Signup/signup.html`,
  },
  USER_EDIT: {
    NICKNAME: `${BASE_PATH}//UserProfileEditor/userProfileEditor.html?option=nickname`,
    PASSWORD: `${BASE_PATH}//UserProfileEditor/userProfileEditor.html?option=password`,
  },
};
