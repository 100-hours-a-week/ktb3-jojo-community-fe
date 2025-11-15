import { PATHS } from "../../../shared/constants/paths.js";
import { ListItemComponent } from "../components/ListItemComponent.js";

export function createListItem(article) {
  const { articleId, title: postTitle, createdAt, author, status } = article;
  const { id: authorId, nickname, profileImageUrl } = author;
  const { likes, comments, views } = status;

  const node = ListItemComponent({
    articleId,
    postTitle,
    likes,
    comments,
    views,
    profileImageUrl,
    createdAt,
    authorId,
    nickname,
  });

  const dom = node.getDom();

  const listItemHeader = dom.querySelector(".list-item-header");
  listItemHeader.addEventListener("click", (e) => {
    e.stopPropagation();
    window.location.href = PATHS.ARTICLE_DETAIL.ABSOLUTE(articleId);
  });

  return dom;
}
