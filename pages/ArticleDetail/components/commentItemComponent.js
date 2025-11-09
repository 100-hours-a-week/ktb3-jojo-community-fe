import { NodeElement } from "../../../shared/lib/domHandler/NodeElementClass.js";

export const commentItemComponent = ({
  avatar,
  nickname,
  createdAt,
  contents,
}) =>
  NodeElement(`
      <div class="comment-item">
        <div class="comment-item-meta flex_row_between">
          <div class="comment-meta-author flex_row_center_gap1">
            <img class="avatar" src=${avatar}></img>
            <div class="comment-author-nickname">${nickname}</div>
          </div>
          <div class="comment-date">${createdAt}</div>
        </div>
        <div class="comment-text">${contents}</div>
      </div>
`);
