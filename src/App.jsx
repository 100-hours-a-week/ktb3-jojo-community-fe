import { createElement, Fragment } from "./vdom.js";

import Header from "./shared/components/Header.js";
import { RouterView } from "./core/router.js";
import { useState } from "./core/hooks/useState.js";
import { useEffect } from "./core/hooks/useEffect.js";

export default function App() {
  return (
    <div>
      <main>
        <RouterView />
      </main>
    </div>
  );
}
