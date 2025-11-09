import { domConverter } from "../../../shared/lib/domHandler/DomConverter.js";

export const statComponent = () =>
  domConverter(`<div class="stat">
              <div class="stat-number">123</div>
              <div class="stat-label">좋아요</div>
            </div>`);

export const actionsBtnComponent = () =>
  domConverter(`<div><button>수정</button>
      <button>삭제</button></div>`);

export const commentItemComponent = () =>
  domConverter(`
      <div class="comment-item">
        <div class="comment-item-meta flex_row_between">
          <div class="comment-meta-author flex_row_center_gap1">
            <div class="avatar"></div>
            <div class="comment-author-nickname">더미 작성자 1</div>
          </div>
          <div class="comment-date">2021-01-01 00:00:00</div>
        </div>
        <div class="comment-text">답글 내용</div>
      </div>
`);
