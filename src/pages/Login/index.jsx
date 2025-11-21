import { h, Fragment } from "../../../src/vdom.js";
import { fetchWrapper } from "../../api/fetchWrapper.js";
import { SERVER_URL } from "../../api/constants/endpoint.js";
import {
  invalidateEmail,
  invalidatePassword,
} from "../../shared/lib/utils/invalidateInput.js";
import { INPUT_HELPER_TEXT } from "../../shared/constants/error.js";

export default function LoginPage() {
  const [email, setEmail] = this.useState("");
  const [password, setPassword] = this.useState("");
  const [showEmailError, setShowEmailError] = this.useState(false);
  const [showPasswordError, setShowPasswordError] = this.useState(false);

  const moveToSignup = this.registerHandler("click", () => {
    console.log("clicked");
  });

  const postLogin = this.registerHandler("click", async () => {
    setShowEmailError(!invalidateEmail(email));
    setShowPasswordError(!invalidatePassword(password));
    if (showEmailError || showPasswordError) return;

    const payload = { email, password };

    await fetchWrapper.post({
      url: SERVER_URL.USER.LOGIN,
      payload,
      onSuccess: (data) => {
        alert(data.message);
      },
    });
  });

  const handleChangeEmail = this.registerHandler("change", (e) => {
    setEmail(e.target.value);
  });

  const handleChangePassword = this.registerHandler("change", (e) => {
    setPassword(e.target.value);
  });

  return (
    <div class="container">
      <div id="header" class="header" data-component="Header" data-key="Header" data-name="Header"
      data-prop-showProfileImg="${true}"></div>
      <div id="login">
        <div class="container-item">
          <form id="loginForm" class="login-box container-item-inner">
            <div class="form-group">
              <label for="email">이메일</label>
              <input
                type="email"
                id="email"
                name="email"
                value="${email}"
                data-onchange="${handleChangeEmail}"
                placeholder="이메일을 입력해주세요"
              />
              <div class="helper-text is-error">
                ${showEmailError ? INPUT_HELPER_TEXT.ENTER_EMAIL : ""}
              </div>
            </div>
            <div class="form-group">
              <label for="password">비밀번호</label>
              <input
                id="password"
                name="password"
                type="password"
                value="${password}"
                data-onchange="${handleChangePassword}"
                placeholder="비밀번호를 입력해주세요"
              />
              <div class="helper-text is-error">
                ${showPasswordError ? INPUT_HELPER_TEXT.ENTER_PASSWORD : ""}
              </div>
            </div>
            <div class="btn-group flex_col_gap1">
              <button
                id="btnLoginSubmit"
                class="btn btn-primary"
                type="button"
                data-onclick="${postLogin}"
              >
                로그인
              </button>
              <button
                id="btnMoveSignup"
                class="btn btn-text"
                type="button"
                data-onclick="${moveToSignup}"
              >
                회원가입
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
