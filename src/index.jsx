import { createElement, Fragment } from "./vdom.js";

import App from "./App.js";
import { render } from "./core/render.js";
import { setupEventDelegator } from "./core/event/eventDelegator.js";

const root = document.getElementById("root");
setupEventDelegator(root);
render(<App />, root);
