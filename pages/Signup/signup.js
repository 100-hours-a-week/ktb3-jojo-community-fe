import {
  clearError,
  showError,
} from "../../shared/lib/domHandler/errorHandle.js";
import { SERVER_URL } from "../../api/constants/endpoint.js";
import {
  invalidateNickname,
  invalidatePassword,
  invalidatePasswordConfirm,
  invalidateEmail,
  invalidateProfileImg,
} from "../../shared/lib/utils/invalidateInput.js";
import {
  openModal,
  closeModal,
} from "../../shared/lib/domHandler/commonHandle.js";
import { fetchWrapper } from "../../api/fetchWrapper.js";
import { PATHS } from "../../shared/constants/paths.js";
import { INPUT_HELPER_TEXT } from "../../shared/constants/error.js";
import { goBack } from "../../shared/lib/domHandler/goBackHandle.js";
import { fileToDataUrl } from "../../shared/lib/utils/fileToDataUrl.js";

const form = document.getElementById("signupForm");
const modal = document.getElementById("signupConfirm");
const btnCancel = modal.querySelector(".modal-btn-cancel");
const btnOpenModal = document.getElementById("signupBtn");
const imageInput = document.getElementById("fileInput");
const photoBox = document.getElementById("photoBox");

const emailInput = form.querySelector('input[name="email"]');
const pwInput = form.querySelector('input[name="password"]');
const pw2Input = form.querySelector('input[name="passwordConfirm"]');
const nickInput = form.querySelector('input[name="nickname"]');

let imageUrl;

document.addEventListener("DOMContentLoaded", () => {
  // 입력 필드 배열
  console.log("loaded");
  const inputs = [emailInput, pwInput, pw2Input, nickInput];

  // 입력 시 에러 제거
  inputs.forEach((input) => {
    input.addEventListener("input", () => clearError(input));
  });
});

// 회원가입 요청
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const payload = {
    email: emailInput.value.trim(),
    password: pwInput.value.trim(),
    nickname: nickInput.value.trim(),
    profileImageUrl: imageUrl,
  };

  // console.log(payload);

  await fetchWrapper.post({
    url: SERVER_URL.USER.SIGNUP,
    payload,
    onSuccess: (data) => {
      console.log(data);
      alert(data.message);
      closeModal("signupConfirm");
      window.location.replace(PATHS.LOGIN.ABSOLUTE);
    },
    onError: (error) => {
      alert(error);
      closeModal("signupConfirm");
    },
  });
});

/**이미지 */

photoBox.addEventListener("click", () => {
  imageInput.click();
});

imageInput.addEventListener("change", async () => {
  const file = imageInput.files;
  imageUrl = await fileToDataUrl(file[0]);
  photoBox.style.backgroundImage = `url(${imageUrl})`;
  photoBox.querySelector(".plus-icon").style.display = "none";
});

// input validate
btnOpenModal.addEventListener("click", (e) => {
  e.preventDefault();

  let valid = true;

  invalidateEmail(emailInput.value, () => {
    showError(emailInput, INPUT_HELPER_TEXT.ENTER_EMAIL);
    valid = false;
  });

  invalidatePassword(pwInput.value, () => {
    showError(pwInput, INPUT_HELPER_TEXT.ENTER_PASSWORD);
    valid = false;
  });

  invalidatePasswordConfirm(pwInput.value, pw2Input.value, () => {
    showError(pw2Input, INPUT_HELPER_TEXT.PASSWORD_IS_NOT_MATCHED);
    valid = false;
  });

  invalidateNickname(nickInput.value, () => {
    showError(nickInput, INPUT_HELPER_TEXT.ENTER_NICKNAME);
    valid = false;
  });

  invalidateProfileImg(imageUrl, () => {
    console.log(imageUrl);
    showError(imageInput, INPUT_HELPER_TEXT.ENTER_PROFILE_IMAGE);
  });

  if (!valid) return;

  openModal("signupConfirm");
});

btnCancel.addEventListener("click", () => {
  closeModal("signupConfirm");
});

goBack("goBackArrow", PATHS.LOGIN.ABSOLUTE);
