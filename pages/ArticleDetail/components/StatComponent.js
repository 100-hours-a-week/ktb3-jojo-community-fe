import { SERVER_URL } from "../../../api/constants/endpoint.js";
import { fetchWrapper } from "../../../api/fetchWrapper.js";
import { NodeElement } from "../../../shared/lib/domHandler/NodeElementClass.js";

export const statComponent = ({ number, label, likedByMe, articleId }) => {
  const node = NodeElement(`<div>
    <div class="stat stat-${label}">
              <div class="stat-number">${number}</div>
              <div class="stat-label">${label}</div>
            </div>
    </div>`);

  if (likedByMe && label == "likes") {
    node.addClassName("stat", "liked");
  }

  if (label == "likes") {
    node.on("stat-likes", "click", async () => {
      if (likedByMe) {
        await fetchWrapper._delete({
          url: SERVER_URL.LIKE.UNLIKE(articleId),
          onSuccess: () => {
            window.location.reload();
          },
        });

        return;
      }

      await fetchWrapper.post({
        url: SERVER_URL.LIKE.LIKE(articleId),
        onSuccess: () => {
          window.location.reload();
        },
      });
    });
  }

  return node;
};
