import { NodeElement } from "../../../shared/lib/domHandler/NodeElementClass.js";

export const articleDetailContainerComponent = ({
  title,
  author,
  createdAt,
  actionButtonHTML,
  imageUrls,
  contents,
  statusHTML,
}) => {
  const { profileImageUrl, nickname } = author;
  const imageUrlsHTML = imageUrls.reduce((acc, curValue) => {
    return acc + `<img src=${curValue}/>`;
  }, "");

  return NodeElement(`
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
};
