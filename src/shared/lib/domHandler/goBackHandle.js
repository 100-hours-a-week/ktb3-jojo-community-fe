/**
 * @description - go back btn 을 눌렀을 때 이동을 도와주는 돔핸들 함수
 * @param {string} id
 * @param {string} location
 */
export function goBack(id, location) {
  const goBackBtn = document.getElementById(id);
  goBackBtn.addEventListener("click", () => {
    window.location.href = location;
  });
}
