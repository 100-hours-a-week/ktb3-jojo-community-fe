import { createElement } from "../../vdom.js";

import { useState } from "../../core/hooks/useState.js";

function Counter({ label }) {
  const [count, setCount] = useState(0);

  console.log(`render ${label}, count =`, count);

  return (
    <div>
      <span>
        {label}: {count}
      </span>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

export function KeyTest() {
  const [reversed, setReversed] = useState(false);

  const items = reversed ? ["A", "B"] : ["B", "A"];

  return (
    <div>
      <button onClick={() => setReversed(!reversed)}>순서 뒤집기</button>

      <div>
        {items.map((label) => (
          <Counter key={label} label={label} />
        ))}
      </div>
    </div>
  );
}
