import { createElement } from "../../vdom.js";

export function ArrowIcon({ size = 34 }) {
  const src = "/dist/src/assets/leftIcon.png";
  return (
    <img
      src={src}
      alt="왼쪽 화살표"
      width={size}
      height={size}
      class="left-arrow"
    />
  );
}
