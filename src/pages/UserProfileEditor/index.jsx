import { createElement } from "../../vdom.js";
import { useState } from "../../core/hooks/useState.js";
import { useEffect } from "../../core/hooks/useEffect.js";
import { fetchWrapper } from "../../api/fetchWrapper.js";
import { SERVER_URL } from "../../api/constants/endpoint.js";
import { INPUT_HELPER_TEXT } from "../../shared/constants/error.js";
import {
  invalidateNickname,
  invalidatePassword,
  invalidatePasswordConfirm,
} from "../../shared/lib/utils/invalidateInput.js";
import { PATHS } from "../../shared/routing/paths.js";
import { useNavigate } from "../../core/router.js";
import { fileToDataUrl } from "../../shared/lib/utils/fileToDataUrl.js";
// import "./userProfileEditor.css";

export default function UserEditPage({ type = "nickname" }) {
  const [user, setUser] = useState(null);
  const [nickname, setNickname] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errors, setErrors] = useState({});
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  const navigate = useNavigate;

  useEffect(() => {
    (async () => {
      const response = await fetchWrapper.get({
        url: SERVER_URL.USER.CURRENT,
      });

      if (!response?.data) return;
      const {
        email,
        nickname: userNickname,
        profileImageUrl: avatar,
      } = response.data;
      setUser({ email, nickname: userNickname, profileImageUrl: avatar });
      setNickname(userNickname ?? "");
      setProfileImageUrl(avatar ?? "");
    })();
  }, []);

  const handleNicknameSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = {};
    let valid = true;

    invalidateNickname(nickname, () => {
      nextErrors.nickname = INPUT_HELPER_TEXT.ENTER_NICKNAME;
      valid = false;
    });

    if (!valid) {
      setErrors(nextErrors);
      return;
    }

    const payload = {
      nickname: nickname.trim(),
      profileImageUrl,
    };

    const response = await fetchWrapper.put({
      url: SERVER_URL.USER.CURRENT,
      payload,
    });

    if (response?.data || response?.message) {
      alert("수정완료");
      setErrors({});
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = {};
    let valid = true;

    invalidatePassword(password, () => {
      nextErrors.password = INPUT_HELPER_TEXT.ENTER_PASSWORD;
      valid = false;
    });

    invalidatePasswordConfirm(password, passwordConfirm, () => {
      nextErrors.passwordConfirm = INPUT_HELPER_TEXT.PASSWORD_IS_NOT_MATCHED;
      valid = false;
    });

    if (!valid) {
      setErrors(nextErrors);
      return;
    }

    const response = await fetchWrapper.put({
      url: SERVER_URL.USER.CURRENT,
      payload: { password: password.trim() },
    });

    if (response?.data || response?.message) {
      alert("수정완료");
      setErrors({});
    }
  };

  const handleChangeImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await fileToDataUrl(file);
    setProfileImageUrl(url);
    setErrors((prev) => ({ ...prev, profileImage: "" }));
  };

  const handleWithdraw = async () => {
    const response = await fetchWrapper._delete({
      url: SERVER_URL.USER.SIGNOUT,
    });

    if (response?.message) {
      alert("탈퇴 성공");
      navigate(PATHS.LOGIN);
    }
  };

  const renderNicknameForm = () => (
    <div class="container-item-inner">
      <div class="form-title">회원정보 수정</div>
      <form class="user-profile-edit-form" onSubmit={handleNicknameSubmit}>
        <div class="form-group flex_col_center_gap1">
          <div
            class="profile-detail-photo"
            onClick={() => {
              const input = document.getElementById("profileImageInput");
              input?.click();
            }}
          >
            <img
              class="profile-detail-photo-img"
              src={profileImageUrl}
              alt="프로필 이미지"
            />
            <span class="profile-change-btn">변경</span>
          </div>
          <input
            class="profile-detail-photo-input"
            type="file"
            id="profileImageInput"
            accept="image/*"
            style="display: none"
            onChange={handleChangeImage}
          />
          <div class="helper-text is-error">{errors.profileImage || ""}</div>
        </div>

        <div class="profile-detail-info">
          <div class="profile-info-item">
            <div class="profile-info-label">이메일</div>
            <div class="profile-info-value">{user?.email || ""}</div>
          </div>

          <div class="form-group">
            <div class="profile-info-item">
              <label for="editNickname" class="profile-info-label">
                닉네임
              </label>
              <input
                id="editNickname"
                name="editNickname"
                class="profile-info-value"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
            <div class="helper-text is-error">{errors.nickname || ""}</div>
          </div>
        </div>

        <button type="submit" class="btn btn-primary">
          수정하기
        </button>
        <button
          type="button"
          class="btn btn-secondary"
          onClick={() => setShowWithdrawModal(true)}
        >
          회원탈퇴
        </button>
      </form>
    </div>
  );

  const renderPasswordForm = () => (
    <div id="password-reset">
      <form class="password-form" onSubmit={handlePasswordSubmit}>
        <div class="form-title">비밀번호 수정</div>

        <div class="form-group">
          <label for="newPassword">비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            name="newPassword"
            id="newPassword"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div class="helper-text is-error">{errors.password || ""}</div>
        </div>

        <div class="form-group">
          <label for="newPasswordConfirm">비밀번호 확인</label>
          <input
            type="password"
            placeholder="비밀번호를 한번 더 입력하세요"
            id="newPasswordConfirm"
            name="newPasswordConfirm"
            required
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <div class="helper-text is-error">{errors.passwordConfirm || ""}</div>
        </div>

        <button type="submit" class="btn btn-primary">
          수정하기
        </button>
      </form>
    </div>
  );

  return (
    <div id="userProfileContainer" class="container">
      <div id="header" class="header"></div>
      <div id="profileEditSlot" class="container-item">
        {type === "password" ? renderPasswordForm() : renderNicknameForm()}
      </div>

      {showWithdrawModal ? (
        <div id="profileWithdraw" class="modal">
          <div class="modal-content">
            <div class="modal-title">회원탈퇴 하시겠습니까?</div>
            <div class="modal-buttons">
              <button
                class="modal-btn-cancel"
                type="button"
                onClick={() => setShowWithdrawModal(false)}
              >
                취소
              </button>
              <button
                class="modal-btn-confirm"
                type="button"
                onClick={() => {
                  setShowWithdrawModal(false);
                  handleWithdraw();
                }}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
