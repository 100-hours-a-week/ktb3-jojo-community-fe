import { createElement, Fragment } from "./vdom.js";

import { RouterView } from "./core/router.js";
import { AppLayout } from "./layout/AppLayout.js";

export default function App() {
  return (
    <AppLayout>
      <RouterView />
      {/* <KeyTest /> */}
    </AppLayout>
  );
}
