import { ComponentClass } from "./ComponentClass.js";

/**
 *
 * @param {*} componentFunction
 * @param {*} selector
 * @returns
 */

export default function createComponent(componentFunction, selector) {
  const component = new ComponentClass(componentFunction);
  component.mount(selector); //사용 시점에 mount
  return component;
}
