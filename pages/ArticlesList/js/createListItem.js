import { PATHS } from "../../../shared/constants/paths.js";

// const dummyImg = "https://dummyimage.com/300";

export function createListItem(article, templateId) {
  const template = document.getElementById(templateId).content.cloneNode(true);
  const templateTitle = template.querySelector(".list-item-title");
  const templateHeader = template.querySelector(".list-item-header");
  const metas = template.querySelectorAll(".list-item-meta > div");

  const footer = template.querySelector(".list-item-footer");
  // const footerAvatar = template.querySelector(".list-item-avatar");
  const footerUser = template.querySelector(".list-item-user");

  const { articleId, title: postTitle, createdAt, author, status } = article;
  const { id: authorId, nickname, profileImageUrl } = author;
  const { likes, comments, views } = status;

  const rootElement = template.firstElementChild;
  rootElement.id = `article-${articleId}`;

  template.id = articleId;
  templateTitle.textContent = postTitle;

  metas[0].textContent = `좋아요 ${likes} 댓글 ${comments} 조회수 ${views}`;
  metas[1].textContent = createdAt;

  footer.id = `author-${authorId}`;
  footerUser.textContent = nickname;

  templateHeader.addEventListener("click", (e) => {
    e.stopPropagation();
    window.location.href = PATHS.ARTICLE_DETAIL.ABSOLUTE(articleId);
  });

  //TODO: 이미지 넣기

  footerUser.textContent = nickname;

  return template;
}
