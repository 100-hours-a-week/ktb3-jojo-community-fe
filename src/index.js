import { ComponentManager } from "./core/ComponentManager.js";
import LoginPage from "./pages/Login/index.js";
import Header from "./shared/components/Header.js";

const manager = new ComponentManager();

manager.register("Header", Header);
manager.register("LoginPage", LoginPage);
manager.mountRoot("LoginPage", "#root");
