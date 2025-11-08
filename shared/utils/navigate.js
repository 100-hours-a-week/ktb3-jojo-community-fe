/**
 * @description 페이지 이동 함수
 * @param {*} pageId
 */
function goToPage(pageId) {
  window.location.href = `${pageId}.html`;
}

/**
 * @description 오픈
 * @param {*} modalId
 */
function showModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("active");
  }
}

function hideModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("active");
  }
}

function closeAllModals() {
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => modal.classList.remove("active"));
}

function closeMenus() {
  const dropdowns = document.querySelectorAll(".dropdown-content");
  dropdowns.forEach((dropdown) => dropdown.classList.remove("active"));
}

document.addEventListener("click", function (event) {
  if (!event.target.closest(".dropdown")) {
    closeMenus();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeAllModals();
  }
});
