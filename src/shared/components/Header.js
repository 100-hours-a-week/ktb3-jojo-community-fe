import { NodeElement } from "../lib/domHandler/NodeElementClass.js";
import { fetchWrapper } from "../../api/fetchWrapper.js";
import { SERVER_URL } from "../../api/constants/endpoint.js";
import { RESPONSE_ERROR_MESSAGE, UNAUTHORIZED } from "../constants/error.js";
import { PATHS } from "../constants/paths.js";
import { Dropdown } from "./Dropdown.js";
import { ArrowIcon } from "./LeftArrow.js";
import { initTheme } from "../lib/utils/theme.js";

/**
 *
 * @param {*} param0
 * @returns
 */

export const Header = async ({
  backBtnCallback,
  showProfileImg = true,
} = {}) => {
  const showBackBtn = !!backBtnCallback;
  initTheme();

  const node = NodeElement(`
    <div>
      ${showBackBtn ? ArrowIcon() : `<div></div>`}
      <h1>오늘노래추천</h1>
      ${
        showProfileImg
          ? `
          <div class="dropdown">
            <img id="header-avatar" class="avatar" />
          </div>`
          : `<div class="dropdown"></div>`
      }
    </div>
  `);

  if (showBackBtn) {
    node.on(".left-arrow", "click", backBtnCallback);
  }

  // profileimage 기능
  if (showProfileImg) {
    const { data } = await fetchWrapper.get({
      url: SERVER_URL.USER.CURRENT,
      onError: (error) => {
        if (error == UNAUTHORIZED) {
          alert(RESPONSE_ERROR_MESSAGE.UNAUTHORIZED);
          window.location.href = PATHS.LOGIN.ABSOLUTE;
        }
      },
    });
    const avatarEl = node.getDom().querySelector(".avatar");
    avatarEl.src = data.profileImageUrl;

    //드롭다운 기능
    const dropdownNode = Dropdown();
    node.attachDomToSlot("dropdown", dropdownNode);

    node.on(".avatar", "click", () => {
      const dropdown = node.getDom().querySelector(".dropdown-content");
      dropdown.classList.toggle("active");
    });
  }

  return node;
};
