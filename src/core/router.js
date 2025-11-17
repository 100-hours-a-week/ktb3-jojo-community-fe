import { ComponentManager } from "./ComponentManager.js";
import LoginPage from "../pages/Login/index.js";

class Router {
  constructor() {
    this.manager = new ComponentManager();

    window.onpopstate = () => {
      this.render(location.pathname);
    };
  }

  navigate(path) {
    history.pushState({}, "", path);
    this.render(path);
  }

  render(path) {
    switch (path) {
      case "/login":
        this.manager.mount(LoginPage, "#app");
        break;

      case "/articles":
        break;

      default:
        this.manager.mount(LoginPage, "#app");
    }
  }
}

window.router = new Router();
window.router.render(location.pathname);
