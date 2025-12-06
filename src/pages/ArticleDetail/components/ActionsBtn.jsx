import { createElement } from "../../../vdom.js";

export function ActionsBtn({ onEdit, onDelete }) {
  return (
    <div class="action-buttons">
      <button class="action-edit-btn" type="button" onClick={onEdit}>
        수정
      </button>
      <button class="action-delete-btn" type="button" onClick={onDelete}>
        삭제
      </button>
    </div>
  );
}
