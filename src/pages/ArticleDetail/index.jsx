import { createElement } from "../../vdom.js";
import { useState } from "../../core/hooks/useState.js";
import { useEffect } from "../../core/hooks/useEffect.js";
import { fetchWrapper } from "../../api/fetchWrapper.js";
import { SERVER_URL } from "../../api/constants/endpoint.js";
import { ArticleDetailContainer } from "./components/ArticleDetailContainer.js";
import { PATHS } from "../../shared/routing/paths.js";
import { useNavigate } from "../../core/router.js";

function parseArticleIdFromHash() {
  const segments = window.location.hash
    .replace(/^#/, "")
    .split("/")
    .filter(Boolean);
  if (segments[0] === "articles" && segments[1]) {
    return segments[1];
  }
  return null;
}

export default function ArticleDetailPage({ params = {} }) {
  const articleId = params.id ?? parseArticleIdFromHash();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [showDeletePostModal, setShowDeletePostModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const navigate = useNavigate;

  useEffect(() => {
    if (!articleId) return;

    (async () => {
      const [articleRes, commentsRes] = await Promise.all([
        fetchWrapper.get({
          url: SERVER_URL.ARTICLE.DETAIL(articleId),
        }),
        fetchWrapper.get({
          url: SERVER_URL.COMMENT.LIST_BY_ARTICLE(articleId),
        }),
      ]);

      setArticle(articleRes?.data ?? null);
      setComments(commentsRes?.data?.items ?? []);
    })();
  }, [articleId]);

  const handleToggleLike = async () => {
    if (!article) return;

    if (article.likedByMe) {
      const res = await fetchWrapper._delete({
        url: SERVER_URL.LIKE.UNLIKE(articleId),
      });
      if (!res) return;

      setArticle((prev) =>
        prev
          ? {
              ...prev,
              likedByMe: false,
              status: {
                ...prev.status,
                likes: Math.max(0, (prev.status?.likes ?? 1) - 1),
              },
            }
          : prev
      );
      return;
    }

    const res = await fetchWrapper.post({
      url: SERVER_URL.LIKE.LIKE(articleId),
    });
    if (!res) return;

    setArticle((prev) =>
      prev
        ? {
            ...prev,
            likedByMe: true,
            status: {
              ...prev.status,
              likes: (prev.status?.likes ?? 0) + 1,
            },
          }
        : prev
    );
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const content = commentInput.trim();
    if (!content) {
      alert("댓글을 작성해주세요.");
      return;
    }

    const response = await fetchWrapper.post({
      url: SERVER_URL.COMMENT.CREATE(articleId),
      payload: { content },
    });

    if (response?.data) {
      setComments((prev) => [...prev, response.data]);
      setCommentInput("");
      setArticle((prev) =>
        prev
          ? {
              ...prev,
              status: {
                ...prev.status,
                comments: (prev.status?.comments ?? 0) + 1,
              },
            }
          : prev
      );
    }
  };

  const handleUpdateComment = async (commentId, newContent) => {
    const response = await fetchWrapper.put({
      url: SERVER_URL.COMMENT.UPDATE(commentId),
      payload: { content: newContent },
    });

    if (response?.data || response?.message) {
      setComments((prev) =>
        prev.map((c) =>
          c.commentId === commentId
            ? { ...c, content: newContent, contents: newContent }
            : c
        )
      );
      return true;
    }

    return false;
  };

  const confirmDeleteComment = async () => {
    if (!commentToDelete) return;

    const response = await fetchWrapper._delete({
      url: SERVER_URL.COMMENT.DELETE(commentToDelete),
    });

    if (response?.data || response?.message) {
      setComments((prev) =>
        prev.filter((c) => c.commentId !== commentToDelete)
      );
      setArticle((prev) =>
        prev
          ? {
              ...prev,
              status: {
                ...prev.status,
                comments: Math.max(0, (prev.status?.comments ?? 1) - 1),
              },
            }
          : prev
      );
    }
    setCommentToDelete(null);
  };

  const handleDeleteArticle = async () => {
    const response = await fetchWrapper._delete({
      url: SERVER_URL.ARTICLE.DELETE(articleId),
      onSuccess: () => navigate(PATHS.ARTICLE_LIST),
    });
  };

  const stats = [
    {
      label: "likes",
      value: article?.status?.likes ?? 0,
      isActive: article?.likedByMe,
      onClick: handleToggleLike,
    },
    {
      label: "comments",
      value: article?.status?.comments ?? comments.length,
    },
    {
      label: "views",
      value: article?.status?.views ?? 0,
    },
  ];

  if (!article) {
    return (
      <div class="container">
        <div class="loading-indicator">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div class="container">
      <div id="detail">
        <ArticleDetailContainer
          article={article}
          stats={stats}
          onEdit={() => navigate(PATHS.ARTICLE_EDIT(article.articleId))}
          onDelete={() => setShowDeletePostModal(true)}
          commentInput={commentInput}
          onChangeCommentInput={(val) => setCommentInput(val)}
          onSubmitComment={handleSubmitComment}
          comments={comments}
          onCommentDelete={(id) => setCommentToDelete(id)}
          onCommentUpdate={handleUpdateComment}
        />
      </div>

      {showDeletePostModal && (
        <div id="deletePostModal" class="modal active">
          <div class="modal-content">
            <div class="modal-title">게시글을 삭제하시겠습니까?</div>
            <div class="modal-buttons">
              <button
                class="modal-btn-cancel"
                type="button"
                onClick={() => setShowDeletePostModal(false)}
              >
                취소
              </button>
              <button
                class="modal-btn-confirm"
                type="button"
                onClick={() => {
                  setShowDeletePostModal(false);
                  handleDeleteArticle();
                }}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {commentToDelete && (
        <div id="deleteCommentModal" class="modal active">
          <div class="modal-content">
            <div class="modal-title">댓글을 삭제하시겠습니까?</div>
            <div class="modal-buttons">
              <button
                class="modal-btn-cancel"
                type="button"
                onClick={() => setCommentToDelete(null)}
              >
                취소
              </button>
              <button
                class="modal-btn-confirm"
                type="button"
                onClick={confirmDeleteComment}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
