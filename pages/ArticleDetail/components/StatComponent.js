import { NodeElement } from "../../../shared/lib/domHandler/NodeElementClass.js";

export const statComponent = ({ number, label }) => {
  const node = NodeElement(`<div class="stat stat-${label}">
              <div class="stat-number">${number}</div>
              <div class="stat-label">${label}</div>
            </div>`);

  if (label == "likes") {
    node.on("stat-likes", "click", () => {
      console.log("liked");
    });
  }

  return node;
};
