import { NodeElement } from "../lib/domHandler/NodeElementClass.js";
import { fetchWrapper } from "../../api/fetchWrapper.js";
import { SERVER_URL } from "../../api/constants/endpoint.js";

export const Header = async ({
  backBtnCallback,
  showProfileImg = true,
} = {}) => {
  const showBackBtn = !!backBtnCallback;

  const node = NodeElement(`
    <div>
      ${
        showBackBtn
          ? `<img
              id="goBackArrow"
              class="left-arrow"
              srcset="/assets/leftArrow.svg"
            />`
          : `<div></div>`
      }
      <h1>아무 말 대잔치</h1>
      ${showProfileImg ? `<img class="avatar" />` : `<div></div>`}
    </div>
  `);

  if (showBackBtn) {
    node.on(".left-arrow", "click", backBtnCallback);
  }

  if (showProfileImg) {
    const { data } = await fetchWrapper.get({ url: SERVER_URL.USER.CURRENT });
    const avatarEl = node.getDom().querySelector(".avatar");
    avatarEl.src = data.profileImageUrl;
  }

  return node;
};
