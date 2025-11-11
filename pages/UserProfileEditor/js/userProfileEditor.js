import { SERVER_URL } from "../../../api/constants/endpoint.js";
import { fetchWrapper } from "../../../api/fetchWrapper.js";
import { Header } from "../../../shared/components/Header.js";
import { getSearchParam } from "../../../shared/lib/utils/getSearchParam.js";
import { NicknameEditorComponent } from "../components/NicknameEditorComponent.js";
import { PasswordEditorComponent } from "../components/PasswordEditorComponent.js";

const searchParam = getSearchParam();

document.addEventListener("DOMContentLoaded", async () => {
  const slot = document.getElementById("profileEditSlot");
  const header = await Header({ showProfileImg: true });

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
    return;
  }

  if (option == "password") {
    slot.appendChild(editPasswordNode.getDom());
    return;
  }
});
