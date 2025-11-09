import { NodeElement } from "../../../shared/lib/domHandler/NodeElementClass.js";

export const statComponent = ({ number, label }) =>
  NodeElement(`<div class="stat">
              <div class="stat-number">${number}</div>
              <div class="stat-label">${label}</div>
            </div>`);
