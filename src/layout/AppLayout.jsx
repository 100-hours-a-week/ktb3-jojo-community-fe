import { createElement, Fragment } from "../vdom.js";
import Header from "../shared/components/Header.js";

export function AppLayout({ children }) {
  return (
    <div class="app-layout">
      <Header />
      <main>{children}</main>
    </div>
  );
}
