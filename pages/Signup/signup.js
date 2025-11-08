import { clearError, showError } from "../../shared/domHandler/errorHandle.js";
import { SERVER_URL } from "../../api/constants/endpoint.js";
import {
  invalidateNickname,
  invalidatePassword,
  invalidatePasswordConfirm,
  invalidateUserID,
} from "../../shared/utils/invalidateInput.js";

const form = document.getElementById("signupForm");
const modal = document.getElementById("signupConfirm");
const btnCancel = modal.querySelector(".modal-btn-cancel");
const btnOpenModal = document.getElementById("signupBtn");

const emailInput = form.querySelector('input[name="email"]');
const pwInput = form.querySelector('input[name="password"]');
const pw2Input = form.querySelector('input[name="passwordConfirm"]');
const nickInput = form.querySelector('input[name="nickname"]');

function openModal() {
  modal.classList.add("active");
}

function closeModal() {
  modal.classList.remove("active");
}

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
  closeModal();
});
// 모달 확인 → 서버로 회원가입 요청
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const payload = {
    email: emailInput.value.trim(),
    password: pwInput.value.trim(),
    nickname: nickInput.value.trim(),
    profileImageUrl: "http://",
  };

  console.log(payload);

  try {
    const res = await fetch(SERVER_URL().USER.SIGNUP, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json();
      const msg = data.message || "회원가입 실패";
      alert(msg);
      closeModal();
      return;
    }

    alert("회원가입이 완료되었습니다!");
    closeModal();

    window.location.href = "pages/Login/login.html";
  } catch (err) {
    console.error(err);
    alert("네트워크 오류가 발생했습니다.");
    closeModal();
  }
});

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

  openModal();
});
