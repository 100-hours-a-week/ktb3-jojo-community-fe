import { createElement, Fragment } from "./vdom.js";

import Header from "./shared/components/Header.js";
import { RouterView } from "./core/router.js";
import { useState } from "./core/hooks/useState.js";
import { useEffect } from "./core/hooks/useEffect.js";

export default function App() {
  const [count, setCount] = useState(0);

  const [count2, setCount2] = useState(1);

  useEffect(() => {
    console.log("현재", count); //현재 값이어야함

    return () => {
      console.log("이전", count); //이전 값이어야함
    };
  }, [count]);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>갱신</button>
      <main>{/* <RouterView /> */}</main>
    </div>
  );
}
