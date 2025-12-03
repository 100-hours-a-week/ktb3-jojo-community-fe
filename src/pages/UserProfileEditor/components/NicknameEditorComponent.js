import { SERVER_URL } from "../../../api/constants/endpoint.js";
import { fetchWrapper } from "../../../api/fetchWrapper.js";
import { INPUT_HELPER_TEXT } from "../../../shared/constants/error.js";
import { openModal } from "../../../shared/lib/domHandler/commonHandle.js";
import {
  clearError,
  showError,
} from "../../../shared/lib/domHandler/errorHandle.js";
import { NodeElement } from "../../../shared/lib/domHandler/NodeElementClass.js";
import { invalidateNickname } from "../../../shared/lib/utils/invalidateInput.js";

export const NicknameEditorComponent = ({
  profileImageUrl,
  email,
  originalNickname,
}) => {
  const safeProfileImageUrl =
    profileImageUrl && profileImageUrl.trim() ? profileImageUrl : "";

  const node = NodeElement(`
    <div class="container-item-inner">
      <div class="form-title">회원정보 수정</div>
      <form id="userProfileEditForm" class="user-profile-edit-form">
        <div class="form-group flex_col_center_gap1">
          <div class="profile-detail-photo" id="profileEditBox">
            <img
              class="profile-detail-photo-img"
              src="${safeProfileImageUrl}"
              alt="프로필 이미지"
            />
            <span class="profile-change-btn">변경</span>
          </div>
          <input
            class="profile-detail-photo-input"
            type="file"
            id="fileInput"
            accept="image/*"
            style="display: none"
          />
          <div class="helper-text"></div>
        </div>

        <div class="profile-detail-info">
          <div class="profile-info-item">
            <div class="profile-info-label">이메일</div>
            <div class="profile-info-value">${email}</div>
          </div>

          <div class="form-group">
            <div class="profile-info-item">
              <label for="editNickname" class="profile-info-label">닉네임</label>
              <input
                id="editNickname"
                name="editNickname"
                class="profile-info-value"
                value="${originalNickname}"
              />
            </div>
            <div class="helper-text"></div>
          </div>
        </div>

        <button type="submit" class="btn btn-primary">수정하기</button>
        <button type="button" class="btn btn-secondary" id="signOutBtn">회원탈퇴</button>
      </form>
    </div>
  `);

  const root = node.getDom();
  const nicknameInput = root.querySelector("#editNickname");
  const img = root.querySelector(".profile-detail-photo-img");

  node.on("#editNickname", "input", () => {
    clearError(nicknameInput);
  });

  node.on(".profile-detail-photo", "click", () => {
    const imageInput = node
      .getDom()
      .querySelector(".profile-detail-photo-input");
    if (!imageInput) return;
    imageInput.click();
  });

  node.on(".profile-detail-photo-input", "change", (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const img = node.getDom().querySelector(".profile-detail-photo-img");
    if (!img) return;

    const url = URL.createObjectURL(file);
    img.src = url;
  });

  node.on(".user-profile-edit-form", "submit", async (e) => {
    e.preventDefault();

    const nickname = nicknameInput?.value.trim() ?? "";
    const profileImageUrlToSend = img?.src ?? "";

    let valid = true;
    invalidateNickname(nickname, () => {
      showError(nicknameInput, INPUT_HELPER_TEXT.ENTER_NICKNAME);
      valid = false;
    });

    if (!valid) return;

    const payload = {
      nickname,
      profileImageUrl: profileImageUrlToSend,
    };

    await fetchWrapper.put({
      url: SERVER_URL.USER.CURRENT,
      payload,
      onSuccess: () => {
        alert("수정완료");
      },
      onError: (err) => {
        showError(nicknameInput, err.message);
      },
    });
  });

  node.on("#signOutBtn", "click", () => {
    openModal("profileWithdraw");
  });

  return node;
};
