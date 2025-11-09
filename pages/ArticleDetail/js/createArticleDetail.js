import { articleDetailContainerComponent } from "../components/articleDetailContainerComponent.js";
import { attachCommentFormListener } from "./createCommentListener.js";
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
  const {
    title,
    contents,
    author,
    status,
    createdAt,
    imageUrls,
    likedByMe,
    isMyContents,
  } = articleData;

  const statusHTML = Object.entries(status)
    .map((val) => {
      return statComponent({ number: val[1], label: val[0] }).getHtml();
    })
    .join("");

  const actionButtonHTML = isMyContents ? actionsBtnComponent().getHtml() : ``;

  const articleDetailContainer = articleDetailContainerComponent({
    title,
    author,
    createdAt,
    actionButtonHTML,
    imageUrls,
    contents,
    statusHTML,
  }).getDom();

  return articleDetailContainer;
}

/**
 *
 * @param {Array
 * {commentId: number, content: string, author: {id: number, nickname: string, profileImageUrl: string},
 * editable: Boolean, createdAt: Date}
 * >} commentsData
 */

export function createArticleCommentsItems(commentsData, articleId) {
  const commentsContainer = document.getElementById("articleCommentSection");

  commentsData.forEach((commentData) => {
    const { author, createdAt, content, commentId, editable } = commentData;

    const node = commentItemComponent({
      commentId,
      avatar: author.profileImageUrl,
      nickname: author.nickname,
      createdAt,
      contents: content,
      editable,
    });

    commentsContainer.appendChild(node.getDom());
  });

  attachCommentFormListener(articleId);
}
