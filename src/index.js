import App from "./App.js";
import { ComponentManager } from "./core/ComponentManager.js";

const manager = new ComponentManager();

manager.mount(App, "#root");
