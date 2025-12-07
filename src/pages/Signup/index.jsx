import { createElement } from "../../vdom.js";
import { useState } from "../../core/hooks/useState.js";
import { useEffect } from "../../core/hooks/useEffect.js";
import { fetchWrapper } from "../../api/fetchWrapper.js";
import { SERVER_URL } from "../../api/constants/endpoint.js";
import { INPUT_HELPER_TEXT } from "../../shared/constants/error.js";
import {
  invalidateEmail,
  invalidateNickname,
  invalidatePassword,
  invalidatePasswordConfirm,
  invalidateProfileImg,
} from "../../shared/lib/utils/invalidateInput.js";
import { PATHS } from "../../shared/routing/paths.js";
import { useNavigate } from "../../core/router.js";
import { fileToDataUrl } from "../../shared/lib/utils/fileToDataUrl.js";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate;

  useEffect(() => {
    setErrors((prev) => ({
      ...prev,
      email: "",
      password: "",
      passwordConfirm: "",
      nickname: "",
      profileImage: "",
    }));
  }, []);

  const validate = () => {
    const nextErrors = {};
    let valid = true;

    invalidateEmail(email, () => {
      nextErrors.email = INPUT_HELPER_TEXT.ENTER_EMAIL;
      valid = false;
    });

    invalidatePassword(password, () => {
      nextErrors.password = INPUT_HELPER_TEXT.ENTER_PASSWORD;
      valid = false;
    });

    invalidatePasswordConfirm(password, passwordConfirm, () => {
      nextErrors.passwordConfirm = INPUT_HELPER_TEXT.PASSWORD_IS_NOT_MATCHED;
      valid = false;
    });

    invalidateNickname(nickname, () => {
      nextErrors.nickname = INPUT_HELPER_TEXT.ENTER_NICKNAME;
      valid = false;
    });

    invalidateProfileImg(imageUrl, () => {
      nextErrors.profileImage = INPUT_HELPER_TEXT.ENTER_PROFILE_IMAGE;
      valid = false;
    });

    setErrors(nextErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setShowConfirm(false);
      return;
    }

    const payload = {
      email: email.trim(),
      password: password.trim(),
      nickname: nickname.trim(),
      profileImageUrl: imageUrl,
    };

    const response = await fetchWrapper.post({
      url: SERVER_URL.USER.SIGNUP,
      payload,
    });

    if (response?.message) {
      alert(response.message);
      setShowConfirm(false);
      navigate(PATHS.LOGIN);
    }
  };

  const handleOpenModal = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setShowConfirm(true);
  };

  const handleChangeImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await fileToDataUrl(file);
    setImageUrl(url);
    setErrors((prev) => ({ ...prev, profileImage: "" }));
  };

  const profileStyle = imageUrl
    ? `background-image: url(${imageUrl})`
    : undefined;

  return (
    <div class="container">
      <div id="signup">
        <div class="container-item">
          <div class="signup-box container-item-inner">
            <div class="form-title">회원가입</div>

            <form id="signupForm" onSubmit={handleSubmit}>
              <div class="form-group">
                <div
                  class="profile-photo"
                  style={profileStyle}
                  onClick={() => {
                    const input = document.getElementById("signupFileInput");
                    input?.click();
                  }}
                >
                  <span
                    class="plus-icon"
                    style={imageUrl ? "display: none" : ""}
                  >
                    +
                  </span>
                </div>
                <input
                  type="file"
                  id="signupFileInput"
                  accept="image/*"
                  style="display: none"
                  onChange={handleChangeImage}
                />
                <div class="helper-text is-error">
                  {errors.profileImage || ""}
                </div>
              </div>
              <div class="form-group">
                <label for="email">이메일*</label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="이메일을 입력해주세요"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div class="helper-text is-error">{errors.email || ""}</div>
              </div>
              <div class="form-group">
                <label for="password">비밀번호*</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div class="helper-text is-error">{errors.password || ""}</div>
              </div>
              <div class="form-group">
                <label for="passwordConfirm">비밀번호 확인*</label>
                <input
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type="password"
                  placeholder="비밀번호를 한번 더 입력해주세요"
                  required
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
                <div class="helper-text is-error">
                  {errors.passwordConfirm || ""}
                </div>
              </div>
              <div class="form-group">
                <label for="nickname">닉네임*</label>
                <input
                  id="nickname"
                  name="nickname"
                  type="text"
                  placeholder="닉네임을 입력해주세요"
                  required
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
                <div class="helper-text is-error">{errors.nickname || ""}</div>
              </div>
              <button
                id="signupBtn"
                class="btn btn-primary"
                type="button"
                onClick={handleOpenModal}
              >
                회원가입
              </button>
              {showConfirm ? (
                <div id="signupConfirm" class="modal active">
                  <div class="modal-content">
                    <div class="modal-title">회원가입을 하시겠습니까?</div>
                    <div class="modal-buttons">
                      <button
                        class="modal-btn-cancel"
                        type="button"
                        onClick={() => setShowConfirm(false)}
                      >
                        취소
                      </button>
                      <button class="modal-btn-confirm" type="submit">
                        확인
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
