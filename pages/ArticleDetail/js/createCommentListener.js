import { SERVER_URL } from "../../../api/constants/endpoint.js";
import { fetchWrapper } from "../../../api/fetchWrapper.js";
import { commentItemComponent } from "../components/commentItemComponent.js";

export const attachCommentFormListener = (articleId) => {
  const commentForm = document.querySelector(".comment-form");
  const commentInput = commentForm.querySelector(".comment-input");

  commentForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const content = commentInput.value.trim();

    if (!content) {
      alert("댓글을 작성해주세요.");
      return;
    }

    console.log(typeof articleId);

    const response = await fetchWrapper.post({
      url: SERVER_URL.COMMENT.CREATE(articleId),
      payload: {
        content,
      },
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.error(error);
        alert(`댓글 작성 실패: ${error}`);
      },
    });

    if (response.data) {
      // 댓글 추가
      const newComment = response.data;
      console.log(newComment);
      // window.location.reload();
      addNewComment(newComment);

      // 입력 초기화
      commentInput.value = "";
    }
  });
};

/**
 * 새 댓글을 화면에 추가
 */
const addNewComment = (commentData) => {
  const newCommentNode = commentItemComponent({
    commentId: commentData.commentId,
    avatar: commentData.author.profileImageUrl || "",
    nickname: commentData.author.nickname,
    createdAt: commentData.createdAt,
    contents: commentData.content,
    editable: commentData.editable || false,
  });

  newCommentNode.setAttachDomToRoot("articleCommentSection");
};
