import { createElement, Fragment } from "./vdom.js";
import { useState } from "./core/hooks/useState.js";

import LoginPage from "./pages/Login/index.js";
import Header from "./shared/components/Header.js";

export default function App() {
  return (
    <div>
      <Header backBtnCallback={true} showProfileImg={true} />
      <LoginPage />
    </div>
  );
}
