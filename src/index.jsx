import { createElement, Fragment } from "./vdom.js";

import App from "./App.js";
import { render } from "./core/render.js";
import { setupEventDelegator } from "./core/event/eventDelegator.js";
import { setupRouterListeners } from "./core/router.js";
import { GlobalState } from "./core/GlobalState.js";

//setup globalState
const root = document.getElementById("root");
const rootVDom = <App />;
GlobalState.rootDom = root;
GlobalState.rootElement = rootVDom;

//setup eventDelegator for roo
setupEventDelegator(root);
//setup router env
setupRouterListeners();
//first rendering
render(rootVDom, root);
