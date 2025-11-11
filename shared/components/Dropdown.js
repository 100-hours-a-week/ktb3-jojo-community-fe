import { SERVER_URL } from "../../api/constants/endpoint.js";
import { fetchWrapper } from "../../api/fetchWrapper.js";
import { PATHS } from "../constants/paths.js";
import { NodeElement } from "../lib/domHandler/NodeElementClass.js";

export const Dropdown = () => {
  const node = NodeElement(
    `<div class="dropdown-content">
                  <button class="dropdown-item edit-profile">회원 정보 수정</button>
                  <button class="dropdown-item edit-password">비밀번호 수정</button>
                  <button class="dropdown-item logout">로그아웃</button>
              </div>`
  );

  node.on(".edit-profile", "click", () => {
    window.location.href = PATHS.USER_EDIT.NICKNAME;
  });
  node.on(".edit-password", "click", () => {
    window.location.href = PATHS.USER_EDIT.PASSWORD;
  });

  node.on(".logout", "click", async () => {
    await fetchWrapper.post({
      url: SERVER_URL.USER.LOGOUT,
      onSuccess: () => {
        alert("로그아웃했습니다.");
        window.location.href = PATHS.LOGIN.ABSOLUTE;
      },
    });
  });

  return node;
};
