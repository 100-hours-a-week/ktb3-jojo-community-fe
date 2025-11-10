import { NodeElement } from "../../../shared/lib/domHandler/NodeElementClass.js";
import { SERVER_URL } from "../../../api/constants/endpoint.js";
import { fetchWrapper } from "../../../api/fetchWrapper.js";
import {
  closeModal,
  openModal,
} from "../../../shared/lib/domHandler/commonHandle.js";
import { PATHS } from "../../../shared/constants/paths.js";
import { actionsBtnComponent } from "./actionsBtnComponent.js";

export const articleDetailContainerComponent = ({
  title,
  author,
  createdAt,
  imageUrls,
  contents,
  statusHTML,
  articleId,
  isMyContents,
}) => {
  const { profileImageUrl, nickname } = author;
  const imageUrlsHTML = imageUrls.reduce((acc, curValue) => {
    return acc + `<img src=${curValue}/>`;
  }, "");

  /**
   * 게시글 수정
   */
  const handleEditArticle = (articleId) => {
    window.location.href = PATHS.ARTICLE_EDITOR.ABSOLUTE(articleId);
  };

  /**
   * 게시글 삭제
   */
  const handleDeleteArticle = (articleId) => {
    openModal("deletePostModal");
    setupDeleteModal(articleId);
  };

  const actionButtonHTML = isMyContents
    ? actionsBtnComponent({
        id: articleId,
        onEdit: handleEditArticle,
        onDelete: handleDeleteArticle,
      }).getHtml()
    : "";

  const node = NodeElement(`
    <div class="container-item">
      <div class="detail-header">
        <div class="detail-title">${title}</div>
        <div class="detail-header-meta flex_row_between">
          <div class="detail-header-meta-info flex_row_center_gap1">
            <div class="detail-header-meta-author flex_row_center_gap1">
              <img class="avatar" src=${profileImageUrl}></img>
              <div class="detail-author-nickname">${nickname}</div>
            </div>
            <div class="detail-header-meta-date">${createdAt}</div>
          </div>
          ${actionButtonHTML}
        </div>
      </div>
      <div class="post-images flex_col_gap1">${imageUrlsHTML}</div>
      <div class="post-content">${contents}</div>

      <div class="post-stats">
      ${statusHTML}
      </div>

      <!-- 댓글 작성 form -->
      <form class="comment-form">
        <textarea class="comment-input" placeholder="댓글을 남겨주세요!"></textarea>
        <div class="comment-footer">
          <button class="btn btn-primary">댓글 남기기</button>
        </div>
      </form>

      <div id="articleCommentSection" class="comment-section"></div>
    </div>
  `);
  return node;
};

/**
 * 삭제 모달 버튼 처리
 */
const setupDeleteModal = (articleId) => {
  const deletePostModal = document.getElementById("deletePostModal");
  const cancelBtn = deletePostModal.querySelector(".modal-btn-cancel");
  const confirmBtn = deletePostModal.querySelector(".modal-btn-confirm");

  // 중복 등록 방지
  const newCancelBtn = cancelBtn.cloneNode(true);
  const newConfirmBtn = confirmBtn.cloneNode(true);
  cancelBtn.replaceWith(newCancelBtn);
  confirmBtn.replaceWith(newConfirmBtn);

  newCancelBtn.addEventListener("click", () => {
    closeModal("deletePostModal");
  });

  newConfirmBtn.addEventListener("click", async () => {
    const response = await fetchWrapper._delete({
      url: SERVER_URL.ARTICLE.DELETE(articleId),
      onSuccess: (data) => console.log(data),
      onError: (error) => {
        console.error(error);
      },
    });

    if (response.data || response.message) {
      closeModal("deletePostModal");
      window.location.href = "/pages/articlesList/articlesList.html";
    }
  });
};
