import { fetchWrapper } from "../../api/fetchWrapper.js";
import { SERVER_URL } from "../../api/constants/endpoint.js";

export default function LoginPage() {
  const [email, setEmail] = this.useState("");
  const [password, setPassword] = this.useState("");

  const moveToSignup = this.registerHandler("click", () => {
    console.log("clicked");
    // window.router.navigate("/signup");
  });

  const postLogin = this.registerHandler("click", async () => {
    const payload = { email, password };

    await fetchWrapper.post({
      url: SERVER_URL.USER.LOGIN,
      payload,
      onSuccess: (data) => {
        alert(data.message);
        // window.router.navigate("/articles");
      },
    });
  });

  const handleChangeEmail = this.registerHandler("change", (e) => {
    setEmail(e.target.value);
  });

  const handleChangePassword = this.registerHandler("change", (e) => {
    setPassword(e.target.value);
  });

  return `
    <div class="container">
      <div id="header" class="header"></div>

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
              <div class="helper-text"></div>
            </div>
            <div class="btn-group flex_col_gap1">
              <button id="btnLoginSubmit" class="btn btn-primary" type="button"
              data-onclick="${postLogin}"
              >
                로그인
              </button>
              <button id="btnMoveSignup" class="btn btn-text" type="button"
              data-onclick="${moveToSignup}">
                회원가입
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
}
