import { createElement } from "../../../vdom.js";
import { ActionsBtn } from "./ActionsBtn.js";
import { StatComponent } from "./StatComponent.js";
import { CommentItem } from "./CommentItem.js";
import { useEffect } from "../../../core/hooks/useEffect.js";

export function ArticleDetailContainer({
  article,
  stats,
  onEdit,
  onDelete,
  commentInput,
  onChangeCommentInput,
  onSubmitComment,
  comments = [],
  onCommentDelete,
  onCommentUpdate,
}) {
  const {
    title,
    author,
    createdAt,
    imageUrls,
    contents,
    content,
    isMyContents,
  } = article || {};

  return (
    <div class="container-item">
      <div class="detail-header">
        <div class="detail-title">{title}</div>
        <div class="detail-header-meta flex_row_between">
          <div class="detail-header-meta-info flex_row_center_gap1">
            <div class="detail-header-meta-author flex_row_center_gap1">
              <img class="avatar" src={author?.profileImageUrl || ""} />
              <div class="detail-author-nickname">{author?.nickname || ""}</div>
            </div>
            <div class="detail-header-meta-date">{createdAt}</div>
          </div>
          <div class="action-btn-slot">
            {isMyContents ? (
              <ActionsBtn onEdit={onEdit} onDelete={onDelete} />
            ) : null}
          </div>
        </div>
      </div>
      <div class="post-images flex_col_gap1">
        {(imageUrls || []).map((url) => (
          <img src={url} />
        ))}
      </div>
      <div class="post-content">{contents ?? content}</div>

      <div id="post-stats" class="post-stats">
        {stats?.map((stat) => (
          <StatComponent key={stat.label} {...stat} />
        ))}
      </div>

      <form class="comment-form" onSubmit={onSubmitComment}>
        <textarea
          class="comment-input"
          placeholder="댓글을 남겨주세요!"
          value={commentInput}
          onChange={(e) => onChangeCommentInput?.(e.target.value)}
        />
        <div class="comment-footer">
          <button class="btn btn-primary" type="submit">
            댓글 남기기
          </button>
        </div>
      </form>

      <div class="comment-section">
        {comments.map((comment) => (
          <CommentItem
            key={comment.commentId}
            comment={comment}
            onDelete={onCommentDelete}
            onUpdate={onCommentUpdate}
          />
        ))}
      </div>
    </div>
  );
}
