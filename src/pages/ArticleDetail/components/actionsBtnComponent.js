import { NodeElement } from "../../../shared/lib/domHandler/NodeElementClass.js";

export const actionsBtnComponent = ({ id, onEdit, onDelete }) => {
  const node = NodeElement(`<div class="action-buttons">
      <button class="action-edit-btn">수정</button>
      <button class="action-delete-btn">삭제</button>
      </div>`);

  node
    .on(".action-edit-btn", "click", () => {
      console.log("edit");
      onEdit(id);
    })
    .on(".action-delete-btn", "click", () => {
      console.log("delete");
      onDelete(id);
    });

  console.log(node);

  return node;
};
