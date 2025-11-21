import { ComponentClass } from "./ComponentClass.js";

/**
 *
 * @param {*} componentFunction
 * @param {*} selector
 * @returns
 */

export default function createComponent(
  componentFunction,
  selector,
  props = {}
) {
  console.log(componentFunction);
  const component = new ComponentClass(componentFunction, props);
  component.attachRoot(selector); //사용 시점에 mount
  return component;
}
