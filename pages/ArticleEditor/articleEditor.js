import { SERVER_URL } from "../../api/constants/endpoint.js";
import { fetchWrapper } from "../../api/fetchWrapper.js";
import { INPUT_HELPER_TEXT } from "../../shared/constants/error.js";
import { PATHS } from "../../shared/constants/paths.js";
import {
  clearError,
  showError,
} from "../../shared/lib/domHandler/errorHandle.js";
import { fileToDataUrl } from "../../shared/lib/utils/fileToDataUrl.js";
import { getSearchParam } from "../../shared/lib/utils/getSearchParam.js";

const searchParam = getSearchParam();

document.addEventListener("DOMContentLoaded", async () => {
  const imageInput = document.getElementById("articleImage");
  const form = document.getElementById("articleForm");
  const titleInput = form.querySelector('input[name="title"]');
  const contentInput = form.querySelector('textarea[name="content"]');
  const submitBtn = form.querySelector('button[type="submit"]');
  const inputs = [contentInput];
  const articleId = searchParam.get("articleId");
  const isEditMode = articleId ? true : false; //수정 모드 -> fetcb

  if (isEditMode) {
    submitBtn.textContent = "수정 완료";

    // 기존 게시글 데이터 불러오기
    const { data: articleData } = await fetchWrapper.get({
      url: SERVER_URL.ARTICLE.DETAIL(articleId),
      onSuccess: (data) => console.log(data),
      onError: (error) => {
        console.error(error);
        window.history.back();
      },
    });

    // 폼에 기존 데이터 채우기
    titleInput.value = articleData?.title;
    contentInput.value = articleData?.contents;
    imageUrls = articleData?.imageUrls || [];
  }

  let imageUrls = [];

  inputs.forEach((input) => {
    input.addEventListener("input", () => clearError(input));
  });

  // 파일 선택 시마다 data URL로 변환
  imageInput.addEventListener("change", async () => {
    const files = Array.from(imageInput.files);
    imageUrls = await Promise.all(files.map(fileToDataUrl));
    // console.log(imageUrls);
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!titleInput.value.trim() || !contentInput.value) {
      showError(contentInput, INPUT_HELPER_TEXT.ENTER_TITLE_CONTENT);
      return;
    }

    const payload = {
      title: titleInput.value.trim(),
      content: contentInput.value,
      imageUrls,
    };

    if (isEditMode) {
      const response = await fetchWrapper.put({
        url: SERVER_URL.ARTICLE.UPDATE(articleId),
        payload,
        onSuccess: (data) => {
          console.log(data);
        },
        onError: (error) => {
          console.error(error);
        },
      });

      if (response.data || response.message) {
        window.location.replace(PATHS.ARTICLE_DETAIL.ABSOLUTE(articleId));
      }
    } else {
      await fetchWrapper.post({
        url: SERVER_URL.ARTICLE.CREATE,
        payload,
        onSuccess: (data) => {
          console.log(data);
          window.location.replace(
            PATHS.ARTICLE_DETAIL.ABSOLUTE(data.data.articleId)
          );
        },
        onError: (error) => {
          console.log(error);
        },
      });
    }
  });
});
