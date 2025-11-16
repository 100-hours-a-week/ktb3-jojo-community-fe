import createComponent from "./Component.js";

export class ComponentManager {
  constructor() {
    this.current = null; //현재 화면에 붙어 있는 컴포넌트
    this.container = null; //컴포넌트 parent
  }

  mount(componentFn, selector, props = {}) {
    this.container = selector;

    //이전 컴포넌트 unmount
    if (this.current) {
      this.current.unmount();
      this.current = null;
    }

    //새 컴포넌트 mount
    const instance = createComponent(componentFn, selector, props);
    this.current = instance;
    return instance;
  }

  unmount() {
    if (!this.current) return;
    this.current.unmount();
    this.current = null;
  }
}
