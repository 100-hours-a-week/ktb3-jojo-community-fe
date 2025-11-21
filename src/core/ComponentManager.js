import { ComponentClass } from "./ComponentClass.js";
import { renderDom } from "./renderDom.js";
import { setupEventDelegator } from "./eventDelegator.js";

export class ComponentManager {
  constructor() {
    this.registry = {}; // { App: AppFn, Child: ChildFn, ... }
    this.instances = new Map(); // { instanceId: ComponentClass }
    this.rootInstance = null;
    this.rootContainer = null;
    this.isRendering = false;
  }

  /**
   * 컴포넌트 함수 등록
   * @param {string} name
   * @param {Function} componentFn
   */
  register(name, componentFn) {
    this.registry[name] = componentFn;
  }

  /**
   * 루트 마운트 (리액트의 createRoot + render 느낌)
   * @param {string} componentName - registry에 등록된 이름
   * @param {string|HTMLElement} selectorOrRoot
   * @param {Object} initialProps
   */
  mountRoot(componentName, selectorOrRoot, initialProps = {}) {
    const container =
      typeof selectorOrRoot === "string"
        ? document.querySelector(selectorOrRoot)
        : selectorOrRoot;

    if (!container) {
      throw new Error("Root container not found");
    }

    const componentFn = this.registry[componentName];
    if (!componentFn) {
      throw new Error(`Component '${componentName}' is not registered.`);
    }

    const instanceId = `root:${componentName}`;
    const instance = new ComponentClass(componentFn, {
      manager: this,
      initialProps,
    });

    this.instances.set(instanceId, instance);
    this.rootInstance = instance;
    this.rootContainer = container;

    // 이벤트 위임: 루트에 한 번만
    setupEventDelegator(container);

    // 최초 렌더
    this.performRender();
  }

  /**
   * 자식 컴포넌트 인스턴스 가져오기 or 생성하기
   * @param {string} name - 컴포넌트 이름 (registry 키)
   * @param {string} key  - 여러 개일 때 구분용
   * @param {Object} props
   */
  getOrCreateChildInstance(name, key, props) {
    const componentFn = this.registry[name];
    if (!componentFn) {
      throw new Error(`Component '${name}' is not registered.`);
    }

    const instanceId = `child:${name}:${key || "default"}`;
    let instance = this.instances.get(instanceId);

    if (!instance) {
      instance = new ComponentClass(componentFn, {
        manager: this,
        initialProps: props,
      });
      this.instances.set(instanceId, instance);
    } else {
      instance.props = props;
    }

    console.log(instance);

    return instance;
  }

  /**
   * 상태 변경 시 다시 렌더 (간단 버전: 전체 다시)
   */
  scheduleUpdate() {
    this.performRender();
  }

  /**
   * 루트부터 전체 렌더 → DOM 교체
   */
  performRender() {
    if (!this.rootInstance || !this.rootContainer) return;
    if (this.isRendering) return;

    this.isRendering = true;

    // 1. 루트 컴포넌트에서 vNode 생성
    const rootVNode = this.rootInstance.render();

    // 2. 기존 DOM 비우고, vNode → DOM으로 다시 생성
    this.rootContainer.innerHTML = "";
    const dom = renderDom(rootVNode, this);
    this.rootContainer.appendChild(dom);

    this.isRendering = false;
  }
}
