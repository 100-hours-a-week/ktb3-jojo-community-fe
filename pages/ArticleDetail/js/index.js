import { SERVER_URL } from "../../../api/constants/endpoint.js";
import { getSearchParam } from "../../../shared/lib/utils/getSearchParam.js";
import { fetchWrapper } from "../../../api/fetchWrapper.js";
import {
  createArticleContainer,
  createArticleCommentsItems,
} from "./createArticleDetail.js";

const searchParam = getSearchParam();
const detail = document.getElementById("detail"); // 안에 detail, comments 추가

document.addEventListener("DOMContentLoaded", async () => {
  const articleId = searchParam.get("articleId");
  console.log(articleId);

  const [articleRes, commentsRes] = await Promise.all([
    fetchWrapper.get({
      url: SERVER_URL.ARTICLE.DETAIL(articleId),
      onSuccess: (data) => console.log(data),
    }),
    fetchWrapper.get({
      url: SERVER_URL.COMMENT.LIST_BY_ARTICLE(articleId),
      onSuccess: (data) => console.log(data),
    }),
  ]);

  const articleDetailElement = createArticleContainer(articleRes.data);

  detail.appendChild(articleDetailElement);

  const { items: commentsDataList } = commentsRes.data;
  createArticleCommentsItems(commentsDataList);
});
