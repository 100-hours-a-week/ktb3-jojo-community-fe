import { createElement } from "../../vdom.js";
import { useEffect } from "../../core/hooks/useEffect.js";
import { useNavigate } from "../../core/router.js";
import { PATHS } from "../../shared/routing/paths.js";
import { useState } from "../../core/hooks/useState.js";
import { fetchWrapper } from "../../api/fetchWrapper.js";
import ListItemComponent from "./components/ListItemComponent.js";
import { SERVER_URL } from "../../api/constants/endpoint.js";

export default function ArticleListPage() {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // 아직 아무 페이지도 로드 안됨
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [sortBy, setSortBy] = useState("viewCnt"); // 기본값: 인기순

  const loadArticles = async (page, sort = sortBy) => {
    if (isLoading) return;
    if (page <= currentPage && sort === sortBy) return;
    if (!hasMore && sort === sortBy) return;

    setIsLoading(true);

    try {
      await fetchWrapper.get({
        url: SERVER_URL.ARTICLE.LIST({ currentPage: page, sort }),
        onSuccess: (data) => {
          const { items, pageInfoDto } = data.data;
          const { nextPage, hasNext } = pageInfoDto;
          setArticles((prev) => [...prev, ...items]);
          setCurrentPage(page);
          setHasMore(hasNext);
        },
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSortChange = (newSort) => {
    if (newSort === sortBy) return;

    setSortBy(newSort);
    setArticles([]);
    setCurrentPage(0);
    setHasMore(true);
    loadArticles(1, newSort);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && hasMore) {
          loadArticles(currentPage + 1);
        }
      },
      { threshold: 0.1 }
    );

    const sentinel = document.querySelector("#scroll-sentinel");
    if (sentinel) observer.observe(sentinel);

    return () => sentinel && observer.unobserve(sentinel);
  }, [currentPage, isLoading, hasMore]);

  return (
    <div class="container">
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

          <div class="sort-buttons">
            <button
              class={sortBy === "viewCnt" ? "sort-btn active" : "sort-btn"}
              onClick={() => handleSortChange("viewCnt")}
            >
              인기순
            </button>
            <button
              class={sortBy === "createdAt" ? "sort-btn active" : "sort-btn"}
              onClick={() => handleSortChange("createdAt")}
            >
              날짜순
            </button>
          </div>

          <div class="article-list-container">
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

          <div id="scroll-sentinel" class="scroll-sentinel"></div>

          {isLoading && (
            <div class="loading-indicator">
              <p>Loading...</p>
            </div>
          )}

          {!hasMore && articles.length > 0 && (
            <div class="end-message">
              <p>더 이상 게시글이 없습니다</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
