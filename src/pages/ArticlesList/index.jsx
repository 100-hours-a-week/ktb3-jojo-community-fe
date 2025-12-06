import { createElement } from "../../vdom.js";
import { useEffect } from "../../core/hooks/useEffect.js";
import { useNavigate } from "../../core/router.js";
import { PATHS } from "../../shared/routing/paths.js";
import { useState } from "../../core/hooks/useState.js";
import { fetchWrapper } from "../../api/fetchWrapper.js";
import ListItemComponent from "./components/ListItemComponent.js";
import { SERVER_URL } from "../../api/constants/endpoint.js";

export default function ArticleListPage() {
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await fetchWrapper.get({
        url: SERVER_URL.ARTICLE.LIST({ currentPage: 0 }),
        onSuccess: (data) => {
          setArticles(data.data.items);
        },
      });
    })();
  }, []);

  // useEffect(() => {
  //   console.log("articles changed:", articles);
  // }, [articles]);

  return (
    <div class="container">
      <div id="header" class="header"></div>

      <div id="article-list">
        <div class="container-item">
          <div class="list-header">
            <div class="list-header-text">
              <p>하루 한 곡을 추천해보세요</p>
            </div>
            <div class="list-header-button">
              <button
                id="btnCreateArticle"
                class="btn btn-primary btn-small"
                onClick={() => {
                  useNavigate(PATHS.ARTICLE_NEW);
                }}
              >
                게시글 작성
              </button>
            </div>
          </div>

          <div>
            {articles?.map((article, idx) => {
              return (
                <ListItemComponent
                  onClick={() => {
                    useNavigate(PATHS.ARTICLE_DETAIL(article.articleId));
                  }}
                  key={article.articleId}
                  {...article}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
