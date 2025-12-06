import { createElement, Fragment } from "../../../src/vdom.js";
import { fetchWrapper } from "../../api/fetchWrapper.js";
import { SERVER_URL } from "../../api/constants/endpoint.js";
import {
  invalidateEmail,
  invalidatePassword,
} from "../../shared/lib/utils/invalidateInput.js";
import { INPUT_HELPER_TEXT } from "../../shared/constants/error.js";
import { useState } from "../../core/hooks/useState.js";
import { useNavigate } from "../../core/router.js";
import { PATHS } from "../../shared/routing/paths.js";
import { useEffect } from "../../core/hooks/useEffect.js";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);

  const moveToSignup = () => {
    useNavigate(PATHS.SIGNUP);
  };

  const postLogin = async () => {
    setShowEmailError(!invalidateEmail(email));
    setShowPasswordError(!invalidatePassword(password));
    if (showEmailError || showPasswordError) return;

    const payload = { email, password };

    await fetchWrapper.post({
      url: SERVER_URL.USER.LOGIN,
      payload,
      onSuccess: (res) => {
        const { data, message } = res;
        fetchWrapper.setAccessToken(data.accessToken);
        alert(message);
        useNavigate(PATHS.ARTICLE_LIST);
      },
    });
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div class="container">
      <div id="login">
        <div class="container-item">
          <form id="loginForm" class="login-box container-item-inner">
            <div class="form-group">
              <label for="email">이메일</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChangeEmail}
                placeholder="이메일을 입력해주세요"
              />
              <div class="helper-text is-error">
                {showEmailError ? INPUT_HELPER_TEXT.ENTER_EMAIL : ""}
              </div>
            </div>
            <div class="form-group">
              <label for="password">비밀번호</label>
              <input
                name="password"
                type="password"
                value={password}
                onChange={handleChangePassword}
                placeholder="비밀번호를 입력해주세요"
              />
              <div class="helper-text is-error">
                {showPasswordError ? INPUT_HELPER_TEXT.ENTER_PASSWORD : ""}
              </div>
            </div>
            <div class="btn-group flex_col_gap1">
              <button class="btn btn-primary" type="button" onClick={postLogin}>
                로그인
              </button>
              <button class="btn btn-text" type="button" onClick={moveToSignup}>
                회원가입
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
