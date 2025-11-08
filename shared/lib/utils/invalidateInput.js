/**
 * @description - 값 검증만 해주는 순수 함수 유틸
 * @returns
 */

export const invalidateEmail = (emailInput, errorCallback) => {
  if (emailInput.trim()) return;
  errorCallback();
};

export const invalidatePassword = (pwInput, errorCallback) => {
  if (pwInput.trim() && pwInput.length >= 8) return;
  errorCallback();
};

export const invalidatePasswordConfirm = (
  pwInput,
  confirmPwInput,
  errorCallback
) => {
  if (
    pwInput.trim() &&
    confirmPwInput.trim() &&
    pwInput.trim() == confirmPwInput.trim()
  )
    return;
  errorCallback();
};

export const invalidateNickname = (nickInput, errorCallback) => {
  if (nickInput.trim()) return;
  errorCallback();
};
