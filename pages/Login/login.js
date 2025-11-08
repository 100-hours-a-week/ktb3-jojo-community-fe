import { SERVER_URL } from "../../api/constants/endpoint.js";
import { fetchWrapper } from "../../api/fetchWrapper.js";
import { PATHS } from "../../shared/constants/paths.js";
import { showError } from "../../shared/lib/domHandler/errorHandle.js";
import {
  invalidateEmail,
  invalidatePassword,
} from "../../shared/lib/utils/invalidateInput.js";

const form = document.getElementById("loginForm");
const btnSignup = document.getElementById("btnMoveSignup");
const emailInput = form.querySelector('input[name="email"]');
const pwInput = form.querySelector('input[name="password"]');

function validation() {
  let valid = true;

  invalidateEmail(emailInput.value, () => {
    showError(emailInput, "이메일 입력해주세요.");
    valid = false;
  });

  invalidatePassword(pwInput.value, () => {
    showError(pwInput, "비밀번호를 입력해주세요.");
    valid = false;
  });

  return valid;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const valid = validation();
  console.log(valid);
  if (!valid) return;

  const payload = {
    email: emailInput.value.trim(),
    password: pwInput.value.trim(),
  };

  fetchWrapper.post({
    url: SERVER_URL.USER.LOGIN,
    payload,
    onSuccess: (statusText) => {
      alert(statusText);
      window.location.replace(PATHS.ARTICLES_LIST.ABSOLUTE);
    },
    onError: alert,
  });
});

btnSignup.addEventListener("click", () => {
  window.location.replace(PATHS.SIGNUP.ABSOLUTE);
});
