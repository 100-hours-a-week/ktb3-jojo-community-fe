import { createElement } from "../../vdom.js";

export default function Dropdown({
  themeLabel,
  onEditProfile,
  onEditPassword,
  onLogout,
  onToggleTheme,
  active = false,
}) {
  const className = `dropdown-content${active ? " active" : ""}`;
  return (
    <div class={className}>
      <button class="dropdown-item edit-profile" type="button" onClick={onEditProfile}>
        회원 정보 수정
      </button>
      <button class="dropdown-item edit-password" type="button" onClick={onEditPassword}>
        비밀번호 수정
      </button>
      <button class="dropdown-item logout" type="button" onClick={onLogout}>
        로그아웃
      </button>
      <button id="theme-toggle" class="dropdown-item" type="button" onClick={onToggleTheme}>
        {themeLabel}
      </button>
    </div>
  );
}
