import { ComponentClass } from "./ComponentClass.js";

/**
 *
 * @param {*} componentFunction
 * @param {*} selector
 * @returns
 */

export default function createComponent(componentFunction, props, selector) {
  console.log(componentFunction);
  const component = new ComponentClass(componentFunction, props);
  component.mount(selector); //사용 시점에 mount
  return component;
}
