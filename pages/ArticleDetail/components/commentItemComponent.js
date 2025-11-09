import { NodeElement } from "../../../shared/lib/domHandler/NodeElementClass.js";
import { actionsBtnComponent } from "./actionsBtnComponent.js";

export const commentItemComponent = ({
  commentId,
  avatar,
  nickname,
  createdAt,
  contents,
  editable,
}) => {
  const actionsBtnHTML = editable ? actionsBtnComponent().getHtml() : "";

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
        ${actionsBtnHTML}
      </div>
  `);

  return node;
};
