import { createElement } from "../../../vdom.js";

export function StatComponent({ label, value, isActive, onClick }) {
  const clickable = typeof onClick === "function";
  const classes = ["stat", `stat-${label}`];
  if (isActive) classes.push("liked");

  return (
    <div class={classes.join(" ")} onClick={clickable ? onClick : undefined}>
      <div class="stat-number">{value}</div>
      <div class="stat-label">{label}</div>
    </div>
  );
}
