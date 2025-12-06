import { attachDomProps } from "./attachDomProps.js";
import { reconciler } from "./reconciler.js";
import { reconcileComponentInstance } from "./reconcileComponentInstance.js";
import { unmount } from "./unmount.js";
/**
 * @description - 함수 컴포넌트 업데이트
 * @param {HTMLElement} parentDom
 * @param {Instance} instance
 * @param {VDom} element
 * @returns
 */

export function updateComponentInstance(parentDom, instance, element) {
  instance.element = element;
  reconcileComponentInstance(parentDom, instance, element);

  return instance;
}

/**
 * @description - host element 업데이트
 * @param {HTMLElement} parentDom
 * @param {Instance} instance
 * @param {VDom} element
 * @returns
 */

export function updateHostInstance(parentDom, instance, element) {
  const dom = instance.dom;
  //텍스트 노드 업데이트
  if (element.type === "TEXT_ELEMENT") {
    if (dom.nodeValue !== element.props.nodeValue) {
      dom.nodeValue = element.props.nodeValue ?? "";
      console.log("text_node_udpated", dom);
    }
    instance.element = element;
    return instance;
  }

  attachDomProps(dom, instance.element.props ?? {}, element.props ?? {});

  instance.element = element;

  const oldChildInstances = instance.childInstances;
  const newChildElements = element.children || [];

  const newChildInstances = matchReconcileWithKey(
    dom,
    oldChildInstances,
    newChildElements
  );

  instance.childInstances = newChildInstances;
  // console.log("updatedInstance", instance, element);
  return instance;
}

const KEY_DUPLICATED_ERROR = "key 값이 고유하지 않습니다.";

// child 의 diff를 key 기반으로 구현
/**
 * @param {HTMLElement} parentDom
 * @param {Instance[]} oldChildInstances
 * @param {Element[]} newChildElements
 */
function matchReconcileWithKey(parentDom, oldChildInstances, newChildElements) {
  const oldInstancesToMap = new Map();
  const newChildInstances = []; //return
  const moveQueue = [];

  oldChildInstances.forEach((instance, idx) => {
    if (oldInstancesToMap.get(instance.element.key ?? idx)) {
      throw new Error(KEY_DUPLICATED_ERROR);
    }

    oldInstancesToMap.set(instance.element.key ?? idx, {
      instance,
      originalLocation: idx,
    }); //idx -> 원래의 위치
  });

  newChildElements.forEach((element, idx) => {
    //이 idx가 현재의 위치, originalLocation 과 비교 후 변경 사항을 저장해야 함.
    const key = element.key ?? idx;
    const matched = oldInstancesToMap.get(key);
    oldInstancesToMap.delete(key);
    const childInstance = reconciler(parentDom, matched?.instance, element);

    if (!childInstance) return;

    //순서큐
    if (matched && matched?.originalLocation !== idx) {
      moveQueue.push({
        instance: childInstance,
        currentLocation: idx,
      }); //현재 위치 가까운순으로 정렬되어 있음
    }

    newChildInstances.push(childInstance);
  });

  //남은 oldInstancesToMap가 있다면 정리
  oldInstancesToMap.forEach(({ instance }) => {
    console.log("old", instance);
    unmount(instance);
  });

  //순서변경 한번에 처리 (instance.dom)
  moveQueue.forEach(({ instance, currentLocation }) => {
    //for insertBefore
    const correctNextDom =
      newChildInstances[currentLocation - 1]?.dom || parentDom.firstChild;

    parentDom.insertBefore(instance.dom, correctNextDom);
  });

  return newChildInstances;
}
