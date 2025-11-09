import { SERVER_URL } from "../../api/constants/endpoint.js";
import { fetchWrapper } from "../../api/fetchWrapper.js";
import { INPUT_HELPER_TEXT } from "../../shared/constants/error.js";
import { PATHS } from "../../shared/constants/paths.js";
import {
  clearError,
  showError,
} from "../../shared/lib/domHandler/errorHandle.js";
import { fileToDataUrl } from "../../shared/lib/utils/fileToDataUrl.js";

document.addEventListener("DOMContentLoaded", () => {
  const imageInput = document.getElementById("articleImage");
  const form = document.getElementById("articleForm");
  const titleInput = form.querySelector('input[name="title"]');
  const contentInput = form.querySelector('textarea[name="content"]');
  const inputs = [contentInput];

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
  });
});
