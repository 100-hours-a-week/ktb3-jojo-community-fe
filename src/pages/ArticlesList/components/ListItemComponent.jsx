import { createElement } from "../../../vdom.js";
import { formatTimeAgo } from "../../../shared/lib/utils/formatDate.js";

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
    <article class="card" onClick={onClick}>
      <div class="content">
        <div class="titleWrapper">
          <h3 class="title">{title}</h3>
          <p class="timeAgo">{formatTimeAgo(createdAt)}</p>
        </div>

        <div class="userInfo">
          <img
            src={profileImageUrl}
            alt={nickname}
            class="avatar"
          />
          <div class="userDetails">
            <p class="userName">{nickname}</p>
          </div>
        </div>

        <div class="actions">
          <button class="actionButton" onClick={(e) => e.stopPropagation()}>
            <span>❤️ {likes}</span>
          </button>
          <button class="actionButton" onClick={(e) => e.stopPropagation()}>
            <span>💬 {comments}</span>
          </button>
          <button class="actionButton" onClick={(e) => e.stopPropagation()}>
            <span>👁️ {views}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
