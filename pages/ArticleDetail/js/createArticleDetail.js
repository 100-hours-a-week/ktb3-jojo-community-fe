import { articleDetailContainerComponent } from "../components/articleDetailContainerComponent.js";
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
    articleId,
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

export function createArticleCommentsItems(commentsData) {
  const commentsContainer = document.getElementById("articleCommentSection");

  commentsData.forEach((commentData) => {
    const { author, createdAt, content, commentId, editable } = commentData;

    const node = commentItemComponent({
      avatar: author.profileImageUrl,
      nickname: author.nickname,
      createdAt,
      contents: content,
    });

    // 내 댓글이면 액션 버튼 추가
    if (editable) {
      const actionBtnNode = actionsBtnComponent();
      node.getDom().appendChild(actionBtnNode.getDom());
    }

    commentsContainer.appendChild(node.getDom());
  });
}
