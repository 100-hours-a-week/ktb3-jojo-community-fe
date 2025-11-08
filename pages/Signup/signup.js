import {
  clearError,
  showError,
} from "../../shared/lib/domHandler/errorHandle.js";
import { SERVER_URL } from "../../api/constants/endpoint.js";
import {
  invalidateNickname,
  invalidatePassword,
  invalidatePasswordConfirm,
  invalidateUserID,
} from "../../shared/lib/utils/invalidateInput.js";
import {
  openModal,
  closeModal,
} from "../../shared/lib/domHandler/modalHandle.js";
import { fetchWrapper } from "../../api/fetchWrapper.js";
import { PATHS } from "../../shared/constants/paths.js";

const form = document.getElementById("signupForm");
const modal = document.getElementById("signupConfirm");
const btnCancel = modal.querySelector(".modal-btn-cancel");
const btnOpenModal = document.getElementById("signupBtn");

const emailInput = form.querySelector('input[name="email"]');
const pwInput = form.querySelector('input[name="password"]');
const pw2Input = form.querySelector('input[name="passwordConfirm"]');
const nickInput = form.querySelector('input[name="nickname"]');

document.addEventListener("DOMContentLoaded", () => {
  // 입력 필드 배열
  console.log("loaded");
  const inputs = [emailInput, pwInput, pw2Input, nickInput];

  // 입력 시 에러 제거
  inputs.forEach((input) => {
    input.addEventListener("input", () => clearError(input));
  });
});

btnCancel.addEventListener("click", () => {
  closeModal(modal);
});

// 회원가입 요청
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const payload = {
    email: emailInput.value.trim(),
    password: pwInput.value.trim(),
    nickname: nickInput.value.trim(),
    profileImageUrl: "http://",
  };

  console.log(payload);

  fetchWrapper.post(
    SERVER_URL().USER.SIGNUP,
    payload,
    (statusText) => {
      alert(statusText);
      closeModal(modal);
      window.location.href = PATHS.LOGIN.ABSOLUTE;
    },
    (statusText) => {
      alert(statusText);
      closeModal(modal);
    }
  );
});

// input validate
btnOpenModal.addEventListener("click", (e) => {
  e.preventDefault();

  let valid = true;

  invalidateUserID(emailInput.value, () => {
    showError(emailInput, "이메일 입력해주세요.");
    valid = false;
  });

  invalidatePassword(pwInput.value, () => {
    showError(pwInput, "비밀번호를 입력해주세요.");
    valid = false;
  });

  invalidatePasswordConfirm(pwInput.value, pw2Input.value, () => {
    showError(pw2Input, "비밀번호가 일치하지 않습니다.");
    valid = false;
  });

  invalidateNickname(nickInput.value, () => {
    showError(nickInput, "닉네임을 입력해주세요.");
    valid = false;
  });

  if (!valid) return;

  openModal(modal);
});
