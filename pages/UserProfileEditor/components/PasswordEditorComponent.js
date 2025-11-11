import { NodeElement } from "../../../shared/lib/domHandler/NodeElementClass.js";

export const PasswordEditorComponent = () => {
  const node = NodeElement(
    `<div id="password-reset">
            <button class="back-btn" onclick="goBack()">←</button>
            
            <div class="password-form">
                <div class="form-title">비밀번호 수정</div>
                
                <div class="password-field">
                    <label>기존*</label>
                    <input type="password" placeholder="기존 비밀번호" id="currentPassword" required>
                    <div class="helper-text">* helper text</div>
                </div>

                <div class="password-field">
                    <label>신규*</label>
                    <input type="password" placeholder="새로운 비밀번호를 입력해주세요" id="newPassword" required>
                    <div class="helper-text">* helper text</div>
                </div>

                <button type="button" class="btn btn-primary" onclick="handleReset()">수정하기</button>
            </div>
        </div>`
  );
  return node;
};
