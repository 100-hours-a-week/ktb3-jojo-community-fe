import { attachDomToRoot } from "../../../shared/lib/domHandler/DomConverter.js";
import {
  statComponent,
  actionsBtnComponent,
  commentItemComponent,
} from "../components/index.js";

/**
 *
 * @param {{articleId: number, title: string, contents: string,
 * author: {id: number, nickname: string, profileImageUrl: string},
 * status: {likes: number, comments: number, views: number},
 * createdAt: Date, updatedAt: Date, imageUrls: Array<string>,
 * likedByMe: Boolean, isMyContents: Boolean  }} articleData
 */

export function createArticleContainer(articleData) {
  const template = document
    .getElementById("articleContainerTemplate")
    .content.cloneNode(true);

  const postStats = template.getElementById("postStats");

  const templateTitle = template.querySelector(".detail-title");
  const authorNickname = template.querySelector(".detail-author-nickname");
  //   const authorAvatar = template.querySelector(".avatar");
  const metaDate = template.querySelector(".detail-header-meta-date");
  const postContent = template.querySelector(".post-content");

  const {
    articleId,
    title,
    contents,
    author,
    status,
    createdAt,
    likedByMe,
    isMyContents,
  } = articleData;

  templateTitle.textContent = title;
  authorNickname.textContent = author.nickname;
  metaDate.textContent = createdAt;
  postContent.textContent = contents;

  const statusCategories = Object.keys(status);

  statusCategories.forEach((key) => {
    const node = statComponent();
    const statNum = node.querySelector(".stat-number");
    const statLabel = node.querySelector(".stat-label");
    statNum.textContent = `${status[key]}`;
    statLabel.textContent = key;

    postStats.appendChild(node);
  });

  /** 내 게시글이면 액션 버튼 넣기 */
  if (!isMyContents) return template;

  const actionBtnNode = actionsBtnComponent();
  attachDomToRoot({ rootId: "actionButtons", fragment: actionBtnNode });

  return template;
}

/**
 *
 * @param {Array<
 * {commentId: number, content: string, author: {id: number, nickname: string, profileImageUrl: string},
 * editable: Boolean, createdAt: Date}
 * >} commentsData
 */

export function createArticleCommentsItems(commentsData) {
  const commentsContainer = document.getElementById("articleCommentSection");

  commentsData.forEach((commentData) => {
    const node = commentItemComponent();

    const authorNickname = node.querySelector(".comment-author-nickname");
    const commentDate = node.querySelector(".comment-date");
    const commentText = node.querySelector(".comment-text");

    const { author, createdAt, content, commentId, editable } = commentData;

    authorNickname.textContent = author.nickname;
    commentDate.textContent = createdAt;
    commentText.textContent = content; // 또는 contents

    // 내 댓글이면 액션 버튼 추가
    if (editable) {
      const actionBtnNode = actionsBtnComponent();
      node.appendChild(actionBtnNode);
    }

    commentsContainer.appendChild(node);
  });
}
