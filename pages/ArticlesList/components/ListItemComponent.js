import { NodeElement } from "../../../shared/lib/domHandler/NodeElementClass.js";

export const ListItemComponent = ({
  articleId,
  postTitle,
  likes,
  comments,
  views,
  profileImageUrl,
  createdAt,
  authorId,
  nickname,
}) => {
  return NodeElement(`
    <div id="article-${articleId}" class="list-item">
      <div class="list-item-header">
        <div class="list-item-title">${postTitle}</div>
        <div class="list-item-meta">
          <div>좋아요 ${likes} 댓글 ${comments} 조회수 ${views}</div>
          <div>${createdAt}</div>
        </div>
      </div>
      <div id="author-${authorId}" class="list-item-footer">
        <img class="list-item-avatar" src=${profileImageUrl}/>
        <div class="list-item-user">${nickname}</div>
      </div>
    </div>
  `);
};
