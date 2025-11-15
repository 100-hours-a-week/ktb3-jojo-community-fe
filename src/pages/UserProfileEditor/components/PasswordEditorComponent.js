import { SERVER_URL } from "../../../api/constants/endpoint.js";
import { fetchWrapper } from "../../../api/fetchWrapper.js";
import { INPUT_HELPER_TEXT } from "../../../shared/constants/error.js";
import {
  clearError,
  showError,
} from "../../../shared/lib/domHandler/errorHandle.js";
import { NodeElement } from "../../../shared/lib/domHandler/NodeElementClass.js";
import {
  invalidatePassword,
  invalidatePasswordConfirm,
} from "../../../shared/lib/utils/invalidateInput.js";

export const PasswordEditorComponent = () => {
  const node = NodeElement(
    `<div id="password-reset">
            <form class="password-form" id="editPasswordForm">
                <div class="form-title">비밀번호 수정</div>
                
                <div class="form-group">
                    <label for="newPassword">비밀번호</label>
                    <input type="password" placeholder="비밀번호를 입력하세요" name="newPassword" id="newPassword" required>
                    <div class="helper-text"></div>
                </div>

                <div class="form-group">
                    <label for="newPasswordConfirm">비밀번호 확인</label>
                    <input type="password" placeholder="비밀번호를 한번 더 입력하세요" id="newPasswordConfirm" name="newPasswordConfirm" required>
                    <div class="helper-text"></div>
                </div>

                <button type="submit" class="btn btn-primary">수정하기</button>
            </form>
        </div>`
  );

  const root = node.getDom();
  const pwInput = root.querySelector('input[name="newPassword"]');
  const pw2Input = root.querySelector('input[name="newPasswordConfirm"]');

  node.on("#newPassword", "input", () => {
    clearError(pwInput);
  });

  node.on("#newPasswordConfirm", "input", () => {
    clearError(pw2Input);
  });

  node.on("#editPasswordForm", "submit", async (e) => {
    e.preventDefault();

    let valid = true;
    invalidatePassword(pwInput.value, () => {
      showError(pwInput, INPUT_HELPER_TEXT.ENTER_PASSWORD);
      valid = false;
    });

    invalidatePasswordConfirm(pwInput.value, pw2Input.value, () => {
      showError(pw2Input, INPUT_HELPER_TEXT.PASSWORD_IS_NOT_MATCHED);
      valid = false;
    });

    if (!valid) return;

    const payload = {
      password: pwInput.value.trim(),
    };

    await fetchWrapper.put({
      url: SERVER_URL.USER.CURRENT,
      payload,
      onSuccess: () => {
        alert("수정완료");
      },
      onError: (err) => {
        alert(err);
      },
    });
  });
  return node;
};
