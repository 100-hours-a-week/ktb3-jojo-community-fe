/**
 * @description 페이지 이동 함수
 * @param {*} pageId
 */
export function goToPage(pageId) {
  window.location.href = `${pageId}.html`;
}

/**
 * @description 오픈
 * @param {*} modalId
 */
export function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("active");
  }
}

export function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("active");
  }
}
