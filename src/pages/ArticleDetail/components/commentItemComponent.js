import { NodeElement } from "../../../shared/lib/domHandler/NodeElementClass.js";
import { actionsBtnComponent } from "./actionsBtnComponent.js";
import { SERVER_URL } from "../../../api/constants/endpoint.js";
import { fetchWrapper } from "../../../api/fetchWrapper.js";
import {
  closeModal,
  openModal,
} from "../../../shared/lib/domHandler/commonHandle.js";

let commentToDelete = null;

export const commentItemComponent = ({
  commentId,
  avatar,
  nickname,
  createdAt,
  contents,
  editable,
}) => {
  const node = NodeElement(`
      <div id="commentId-${commentId}" class="comment-item flex_row_between">
        <div>
          <div class="comment-item-meta flex_row_center_gap1">
            <div class="comment-meta-author flex_row_center_gap1">
              <img class="avatar" src=${avatar}></img>
              <div class="comment-author-nickname">${nickname}</div>
            </div>
            <div class="comment-date">${createdAt}</div>
          </div>
          <div class="comment-text">${contents}</div>
        </div>
        <div class="action-btn-slot"></div>
      </div>
  `);

  if (!editable) return node;

  const actionsBtnNode = actionsBtnComponent({
    id: commentId,
    onEdit: (id) => handleEditComment(node.getDom(), id),
    onDelete: () => handleDeleteComment(node.getDom()),
  });

  node.attachDomToSlot(".action-btn-slot", actionsBtnNode);

  return node;
};
/**
 * 댓글 수정 - 인라인 에디팅
 */
const handleEditComment = (commentItem, commentId) => {
  const commentText = commentItem.querySelector(".comment-text");
  const actionButtons = commentItem.querySelector(".action-buttons");
  const currentText = commentText.textContent;

  if (commentText.classList.contains("editing")) return;

  commentText.classList.add("editing");

  //TODO: 스타일 수정
  const editFormHTML = `
    <div class="comment-edit-form">
      <textarea name="contents" class="comment-edit-input">${currentText}</textarea>
      <div class="action-buttons">
        <button class="comment-confirm-btn">완료</button>
        <button class="comment-cancel-btn">취소</button>
      </div>
    </div>
  `;

  const editFormNode = NodeElement(editFormHTML);
  const editFormElement = editFormNode.getDom();

  commentText.style.display = "none";
  commentText.parentNode.insertBefore(editFormElement, commentText);
  actionButtons.style.display = "none";

  const textarea = editFormElement.querySelector(".comment-edit-input");
  textarea.focus();

  // 직접 addEventListener 사용
  editFormNode
    .on(".comment-confirm-btn", "click", async () => {
      const newContent = textarea.value.trim();

      if (!newContent) {
        return alert("댓글 내용을 입력해주세요.");
      }

      if (newContent === currentText) {
        cancelEditComment(editFormElement, commentText, actionButtons);
        return;
      }

      try {
        const response = await fetchWrapper.put({
          url: SERVER_URL.COMMENT.UPDATE(commentId),
          payload: { content: newContent },
          onSuccess: (data) => console.log(data),
          onError: (error) => {
            console.error(error);
          },
        });

        if (response.data || response.message) {
          commentText.textContent = newContent;
          cancelEditComment(editFormElement, commentText, actionButtons);
        }
      } catch (e) {
        // alert(e);
      }
    })
    .on(".comment-cancel-btn", "click", () => {
      cancelEditComment(editFormElement, commentText, actionButtons);
    });
};

/**
 * 댓글 수정 취소
 */
const cancelEditComment = (editFormElement, commentText, actionButtons) => {
  editFormElement.remove();
  commentText.style.display = "block";
  commentText.classList.remove("editing");
  actionButtons.style.display = "block";
};

/**
 * 댓글 삭제 - 모달 표시
 */
const handleDeleteComment = (commentItem) => {
  commentToDelete = {
    commentId: commentItem.id.replace("commentId-", ""),
    commentItem,
  };
  openModal("deleteCommentModal");

  setupDeleteModal();
};

/**
 * 삭제 모달 버튼 처리
 */
const setupDeleteModal = () => {
  const deleteCommentModal = document.getElementById("deleteCommentModal");
  const cancelBtn = deleteCommentModal.querySelector(".modal-btn-cancel");
  const confirmBtn = deleteCommentModal.querySelector(".modal-btn-confirm");

  // 중복 등록 방지
  const newCancelBtn = cancelBtn.cloneNode(true);
  const newConfirmBtn = confirmBtn.cloneNode(true);
  cancelBtn.replaceWith(newCancelBtn);
  confirmBtn.replaceWith(newConfirmBtn);

  newCancelBtn.addEventListener("click", () => {
    closeModal("deleteCommentModal");
    commentToDelete = null;
  });

  newConfirmBtn.addEventListener("click", async () => {
    if (!commentToDelete) return;

    const response = await fetchWrapper._delete({
      url: SERVER_URL.COMMENT.DELETE(commentToDelete.commentId),
      onSuccess: (data) => console.log(data),
      onError: (error) => {
        console.error(error);
      },
    });

    if (response.data || response.message) {
      commentToDelete.commentItem.remove();
      closeModal("deleteCommentModal");
      commentToDelete = null;
    }
  });
};
