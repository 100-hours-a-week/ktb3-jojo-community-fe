const INPUT_HELPER_TEXT_FUNCTION = () => ({
  ENTER_EMAIL: "이메일 입력해주세요.",
  ENTER_PASSWORD: "비밀번호를 8자 이상 입력해주세요.",
  PASSWORD_IS_NOT_MATCHED: "비밀번호가 일치하지 않습니다.",
  ENTER_NICKNAME: "닉네임을 입력해주세요.",
  ENTER_PROFILE_IMAGE: "프로필 사진을 추가해주세요.",

  ENTER_TITLE_CONTENT: "제목과 내용을 입력해주세요.",
});

export const UNAUTHORIZED = "unauthorized";

const RESPONSE_ERROR_MESSAGE_FUNCTION = () => ({
  UNAUTHORIZED: "로그인해주세요.",
});

export const INPUT_HELPER_TEXT = INPUT_HELPER_TEXT_FUNCTION();
export const RESPONSE_ERROR_MESSAGE = RESPONSE_ERROR_MESSAGE_FUNCTION();
