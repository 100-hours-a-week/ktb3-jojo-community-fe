import { createElement, Fragment } from "./vdom.js";

import App from "./App.js";
import { render } from "./core/render.js";
import { setupEventDelegator } from "./core/event/eventDelegator.js";
import { setupRouterListeners } from "./core/router.js";
import { globalState } from "./core/GlobalState.js";

//setup globalState
const root = document.getElementById("root");
const rootVDom = <App />;
globalState.setRootDom(root);
globalState.setRootElement(rootVDom);

//setup eventDelegator for root
setupEventDelegator(root);
//setup router env
setupRouterListeners();
//first rendering
render(rootVDom, root);
