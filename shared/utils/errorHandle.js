export function showError(inputEl, msg) {
  const helper = inputEl.closest(".form-group").querySelector(".helper-text");
  helper.textContent = msg;
  inputEl.classList.add("is-error");
}

export function clearError(inputEl) {
  const helper = inputEl.closest(".form-group").querySelector(".helper-text");
  helper.textContent = "";
  inputEl.classList.remove("is-error");
}
