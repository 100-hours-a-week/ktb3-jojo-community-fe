import { SERVER_URL } from "../../../api/constants/endpoint.js";
import { fetchWrapper } from "../../../api/fetchWrapper.js";
import { Header } from "../../../shared/components/Header.js";
import { PATHS } from "../../../shared/constants/paths.js";
import { closeModal } from "../../../shared/lib/domHandler/commonHandle.js";
import { getSearchParam } from "../../../shared/lib/utils/getSearchParam.js";
import { NicknameEditorComponent } from "../components/NicknameEditorComponent.js";
import { PasswordEditorComponent } from "../components/PasswordEditorComponent.js";

const searchParam = getSearchParam();

document.addEventListener("DOMContentLoaded", async () => {
  const slot = document.getElementById("profileEditSlot");
  const header = await Header({ showProfileImg: true });

  const deleteModal = document.getElementById("profileWithdraw");
  const cancelBtn = deleteModal.querySelector(".modal-btn-cancel");
  const confirmBtn = deleteModal.querySelector(".modal-btn-confirm");

  header.setAttachDomToRoot("header");

  const option = searchParam.get("option");

  //TODO: header 와 중복으로 profileImage fetch 하는 것 수정하기
  const {
    data: { email, nickname: originalNickname, profileImageUrl },
  } = await fetchWrapper.get({ url: SERVER_URL.USER.CURRENT });

  const editNicknameNode = NicknameEditorComponent({
    email,
    originalNickname,
    profileImageUrl,
  });

  const editPasswordNode = PasswordEditorComponent();

  if (option == "nickname") {
    slot.appendChild(editNicknameNode.getDom());
  } else if (option == "password") {
    slot.appendChild(editPasswordNode.getDom());
  }

  // 모달
  cancelBtn.addEventListener("click", () => {
    closeModal("profileWithdraw");
  });

  confirmBtn.addEventListener("click", async () => {
    await fetchWrapper._delete({
      url: SERVER_URL.USER.SIGNOUT,
      onSuccess: () => {
        alert("탈퇴 성공");
        window.location.href = PATHS.LOGIN.ABSOLUTE;
      },
      onError: (error) => {
        console.error(error);
      },
    });
  });
});
