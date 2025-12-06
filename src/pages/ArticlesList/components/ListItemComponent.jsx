import { createElement } from "../../../vdom.js";

export default function ListItemComponent({
  articleId,
  author,
  createdAt,
  status,
  title,
  onClick,
}) {
  const { id, nickname, profileImageUrl } = author;
  const { comments, likes, views } = status;

  return (
    <div id="article" class="list-item" onClick={onClick}>
      <div class="list-item-header">
        <div class="list-item-title">{title}</div>
        <div class="list-item-meta">
          <div>
            좋아요 {likes} 댓글 {comments} 조회수 {views}
          </div>
          <div>{createdAt}</div>
        </div>
      </div>
      <div class="list-item-footer">
        <img class="list-item-avatar" src={profileImageUrl}></img>
        <div class="list-item-user">{nickname}</div>
      </div>
    </div>
  );
}
