import { ComponentManager } from "./core/ComponentManager.js";
import LoginPage from "./pages/Login/index.js";

const manager = new ComponentManager();

manager.mount(LoginPage, "#root");
