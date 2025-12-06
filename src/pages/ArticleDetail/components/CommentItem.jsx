import { createElement } from "../../../vdom.js";
import { useState } from "../../../core/hooks/useState.js";
import { useEffect } from "../../../core/hooks/useEffect.js";
import { ActionsBtn } from "./ActionsBtn.js";

export function CommentItem({ comment, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(
    comment?.content ?? comment?.contents ?? ""
  );

  useEffect(() => {
    setEditValue(comment?.content ?? comment?.contents ?? "");
  }, [comment?.content, comment?.contents]);

  const handleConfirmEdit = async () => {
    const trimmed = editValue.trim();
    if (!trimmed) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    if (trimmed === (comment?.content ?? comment?.contents ?? "")) {
      setIsEditing(false);
      return;
    }

    const success = await onUpdate?.(comment.commentId, trimmed);
    if (success) {
      setIsEditing(false);
    }
  };

  return (
    <div class="comment-item flex_row_between">
      <div>
        <div class="comment-item-meta flex_row_center_gap1">
          <div class="comment-meta-author flex_row_center_gap1">
            <img class="avatar" src={comment.author?.profileImageUrl || ""} />
            <div class="comment-author-nickname">
              {comment.author?.nickname || ""}
            </div>
          </div>
          <div class="comment-date">{comment.createdAt}</div>
        </div>
        {isEditing ? (
          <div class="comment-edit-form">
            <textarea
              name="contents"
              class="comment-edit-input"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            ></textarea>
          </div>
        ) : (
          <div class="comment-text">{comment.content ?? comment.contents}</div>
        )}
      </div>
      {comment.editable ? (
        <div class="action-btn-slot">
          {isEditing ? (
            <div class="action-buttons">
              <button
                class="comment-confirm-btn"
                type="button"
                onClick={handleConfirmEdit}
              >
                완료
              </button>
              <button
                class="comment-cancel-btn"
                type="button"
                onClick={() => {
                  setEditValue(comment.content ?? comment.contents ?? "");
                  setIsEditing(false);
                }}
              >
                취소
              </button>
            </div>
          ) : (
            <ActionsBtn
              onEdit={() => setIsEditing(true)}
              onDelete={() => onDelete?.(comment.commentId)}
            />
          )}
        </div>
      ) : null}
    </div>
  );
}
