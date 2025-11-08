const BASE_PATH = "/pages";

export const PATHS = {
  ARTICLE_DETAIL: {
    ABSOLUTE: (articleId) =>
      `${BASE_PATH}/ArticleDetail/articleDetail.html?articleId=${articleId}`,
  },
  ARTICLE_EDITOR: {
    ABSOLUTE: `${BASE_PATH}/ArticleEditor/articleEditor.html`,
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
};
