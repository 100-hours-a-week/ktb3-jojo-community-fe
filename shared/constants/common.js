const BASE_URL = "http://localhost:8080/api";
const USER_URL = `${BASE_URL}/user`;
const COMMENT_URL = `${BASE_URL}/comments`;
const ARTICLE_URL = `${BASE_URL}/article`;
const LIKE_URL = `${BASE_URL}/like`;

const SERVER_URL = () => ({
  USER: {
    LOGIN: `${USER_URL}/login`,
    LOGOUT: `${USER_URL}/current/logout`,
    SIGNOUT: `${USER_URL}/current/signout`,
    SIGNUP: `${USER_URL}/signup`,
    CURRENT: `${USER_URL}/current`,
  },
  ARTICLE: {
    LIST: `${ARTICLE_URL}`,
    CREATE: `${ARTICLE_URL}`,
    DETAIL: (articleId) => `${ARTICLE_URL}/${articleId}`,
    UPDATE: (articleId) => `${ARTICLE_URL}/${articleId}`,
    DELETE: (articleId) => `${ARTICLE_URL}/${articleId}`,
  },
  COMMENT: {
    LIST_BY_ARTICLE: (articleId) => `${COMMENT_URL}/${articleId}`,
    CREATE: (articleId) => `${COMMENT_URL}/${articleId}`,
    UPDATE: (commentId) => `${COMMENT_URL}/${commentId}`,
    DELETE: (commentId) => `${COMMENT_URL}/${commentId}`,
  },
  LIKE: {
    LIKE: (articleId) => `${LIKE_URL}/${articleId}`,
    UNLIKE: (articleId) => `${LIKE_URL}/${articleId}`,
  },
});
