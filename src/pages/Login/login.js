import { SERVER_URL } from "../../api/constants/endpoint.js";
import { fetchWrapper } from "../../api/fetchWrapper.js";
import { INPUT_HELPER_TEXT } from "../../shared/constants/error.js";
import { PATHS } from "../../shared/constants/paths.js";
import { showError } from "../../shared/lib/domHandler/errorHandle.js";
import { Header } from "../../shared/components/Header.js";
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
    showError(emailInput, INPUT_HELPER_TEXT.ENTER_EMAIL);
    valid = false;
  });

  invalidatePassword(pwInput.value, () => {
    showError(pwInput, INPUT_HELPER_TEXT.ENTER_PASSWORD);
    valid = false;
  });

  return valid;
}

document.addEventListener("DOMContentLoaded", async () => {
  const header = await Header({
    showProfileImg: false,
  });

  header.setAttachDomToRoot("header");
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const valid = validation();
  console.log(valid);
  if (!valid) return;

  const payload = {
    email: emailInput.value.trim(),
    password: pwInput.value.trim(),
  };

  await fetchWrapper.post({
    url: SERVER_URL.USER.LOGIN,
    payload,
    onSuccess: (data) => {
      alert(data.message);
      window.location.replace(PATHS.ARTICLES_LIST.ABSOLUTE);
    },
    onError: alert,
  });
});

btnSignup.addEventListener("click", () => {
  window.location.replace(PATHS.SIGNUP.ABSOLUTE);
});
