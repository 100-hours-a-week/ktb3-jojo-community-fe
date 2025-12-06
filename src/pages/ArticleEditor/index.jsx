import { createElement } from "../../vdom.js";
import { useState } from "../../core/hooks/useState.js";
import { useEffect } from "../../core/hooks/useEffect.js";
import { fetchWrapper } from "../../api/fetchWrapper.js";
import { SERVER_URL } from "../../api/constants/endpoint.js";
import { INPUT_HELPER_TEXT } from "../../shared/constants/error.js";
import { PATHS } from "../../shared/routing/paths.js";
import { useNavigate } from "../../core/router.js";
import { fileToDataUrl } from "../../shared/lib/utils/fileToDataUrl.js";
// import "./articleEditor.css";

function parseArticleRoute(params = {}) {
  if (params.id) {
    return { mode: "edit", articleId: params.id };
  }

  const segments = window.location.hash
    .replace(/^#/, "")
    .split("/")
    .filter(Boolean);

  if (segments[0] === "articles" && segments[1] === "new") {
    return { mode: "create", articleId: null };
  }

  if (segments[0] === "articles" && segments[2] === "edit") {
    return { mode: "edit", articleId: segments[1] };
  }

  return { mode: "create", articleId: null };
}

function ImagePreview({ imageUrl, onDelete }) {
  return (
    <div class="preview-image-wrapper">
      <img class="preview-image" src={imageUrl} />
      <button
        class="btn delete-image-preview-btn"
        type="button"
        onClick={() => onDelete(imageUrl)}
      >
        x
      </button>
    </div>
  );
}

export default function ArticleEditPage({ params = {} }) {
  const { mode, articleId } = parseArticleRoute(params);
  const isEditMode = mode === "edit" && !!articleId;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [helperText, setHelperText] = useState("");
  const navigate = useNavigate;

  useEffect(() => {
    if (!isEditMode) return;

    (async () => {
      const { data } = await fetchWrapper.get({
        url: SERVER_URL.ARTICLE.DETAIL(articleId),
      });

      setTitle(data?.title ?? "");
      setContent(data?.contents ?? data?.content ?? "");
      setImages(data?.imageUrls ?? []);
    })();
  }, [isEditMode, articleId]);

  const handleChangeImages = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const urls = await Promise.all(files.map((file) => fileToDataUrl(file)));
    setImages((prev) => [...prev, ...urls]);
  };

  const handleDeleteImage = (target) => {
    setImages((prev) => prev.filter((url) => url !== target));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle || !trimmedContent) {
      setHelperText(INPUT_HELPER_TEXT.ENTER_TITLE_CONTENT);
      return;
    }

    setHelperText("");

    const payload = {
      title: trimmedTitle,
      content: trimmedContent,
      imageUrls: images,
    };

    if (isEditMode) {
      const response = await fetchWrapper.put({
        url: SERVER_URL.ARTICLE.UPDATE(articleId),
        payload,
      });

      if (response?.data || response?.message) {
        navigate(PATHS.ARTICLE_DETAIL(articleId));
      }
      return;
    }

    const response = await fetchWrapper.post({
      url: SERVER_URL.ARTICLE.CREATE,
      payload,
    });

    if (response?.data?.articleId) {
      navigate(PATHS.ARTICLE_DETAIL(response.data.articleId));
    }
  };

  const titleLabel = isEditMode ? "게시물 수정" : "게시물 작성";

  return (
    <div class="container">
      <div id="header" class="header"></div>
      <div id="write">
        <div class="container-item">
          <div class="write-box flex_col_center_gap1">
            <div class="form-title">{titleLabel}</div>

            <form id="articleForm" class="write-form" onSubmit={handleSubmit}>
              <div class="form-group">
                <label for="articleTitle">제목*</label>
                <input
                  id="articleTitle"
                  name="title"
                  maxlength="26"
                  type="text"
                  placeholder="제목을 입력해주세요. (최대 26글자)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div class="form-group">
                <label for="articleContent">내용*</label>
                <textarea
                  id="articleContent"
                  name="content"
                  placeholder="내용을 입력해주세요."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                ></textarea>
                <div class="helper-text">{helperText}</div>
              </div>

              <div class="form-group">
                <label for="articleImage">이미지</label>
                <input
                  id="articleImage"
                  name="imageUrls"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleChangeImages}
                />
                <div id="imagePreviewList" class="image-preview-list">
                  {images.map((url) => (
                    <ImagePreview
                      key={url}
                      imageUrl={url}
                      onDelete={handleDeleteImage}
                    />
                  ))}
                </div>
              </div>

              <button type="submit" class="btn btn-primary">
                완료
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
