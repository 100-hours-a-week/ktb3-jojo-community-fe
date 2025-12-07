import { createElement } from "../../vdom.js";
import { useState } from "../../core/hooks/useState.js";
import { useEffect } from "../../core/hooks/useEffect.js";
import { fetchWrapper } from "../../api/fetchWrapper.js";
import { SERVER_URL } from "../../api/constants/endpoint.js";
import { RESPONSE_ERROR_MESSAGE, UNAUTHORIZED } from "../constants/error.js";
import { PATHS } from "../routing/paths.js";
import Dropdown from "./Dropdown.js";
import { ArrowIcon } from "./LeftArrow.js";
import {
  initTheme,
  toggleTheme,
  getPreferredTheme,
} from "../lib/utils/theme.js";
import { useNavigate } from "../../core/router.js";
import { AuthStore } from "../state/AuthStore.js";

export default function Header({ backBtnCallback, showProfileImg = true }) {
  const [avatar, setAvatar] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(AuthStore.getState().isLoggedIn);
  const [showDropdown, setShowDropdown] = useState(false);
  const [themeLabel, setThemeLabel] = useState(getPreferredTheme());
  const navigate = useNavigate;

  const currentPath = window.location.hash;
  const shouldShowBackButton =
    currentPath !== PATHS.MAIN && currentPath !== PATHS.LOGIN;

  const handleGoBack = () => {
    window.history.back();
  };

  useEffect(() => {
    initTheme();

    const applyAuthState = (nextState) => {
      setIsLoggedIn(!!nextState.isLoggedIn);
      setAvatar(nextState.user?.profileImageUrl ?? "");
    };

    applyAuthState(AuthStore.getState());
    const unsubscribe = AuthStore.subscribe(applyAuthState);

    return () => unsubscribe?.();
  }, []);

  useEffect(() => {
    if (!showProfileImg) return;
    if (!isLoggedIn) {
      setAvatar("");
      return;
    }

    (async () => {
      let fetchError = null;
      const data = await fetchWrapper.get({
        url: SERVER_URL.USER.CURRENT,
        onError: (err) => {
          fetchError = err;
        },
      });

      if (fetchError === UNAUTHORIZED) {
        alert(RESPONSE_ERROR_MESSAGE.UNAUTHORIZED);
        navigate(PATHS.LOGIN);
        return;
      }

      if (data?.profileImageUrl) {
        setAvatar(data.profileImageUrl);
        AuthStore.notify({ isLoggedIn: true, user: data });
      }
    })();
  }, [showProfileImg, isLoggedIn]);

  const handleToggleTheme = () => {
    toggleTheme();
    const current =
      document.documentElement.getAttribute("data-theme") ?? "light";
    setThemeLabel(current);
    setShowDropdown(false);
  };

  const handleLogout = async () => {
    setShowDropdown(false);
    const res = await fetchWrapper.post({
      url: SERVER_URL.USER.LOGOUT,
      onSuccess: () => {
        alert("로그아웃했습니다.");
        navigate(PATHS.LOGIN);
      },
    });

    if (res !== undefined) {
      AuthStore.notify({ isLoggedIn: false, user: null });
    }
  };

  const handleEditProfile = () => {
    setShowDropdown(false);
    navigate(PATHS.USER_EDIT_NICKNAME);
  };

  const handleEditPassword = () => {
    setShowDropdown(false);
    navigate(PATHS.USER_EDIT_PASSWORD);
  };

  const moveToMain = () => {
    navigate(PATHS.ARTICLE_LIST);
  };

  return (
    <div class="header">
      <div>
        <div>
          {backBtnCallback || shouldShowBackButton ? (
            <div onClick={backBtnCallback || handleGoBack}>
              <ArrowIcon />
            </div>
          ) : null}
        </div>
        <span class="logo-text" onClick={moveToMain}>
          SoundSpace
        </span>
        <div class="dropdown">
          {showProfileImg && isLoggedIn ? (
            <img
              class="avatar"
              src={avatar}
              onClick={() => setShowDropdown((prev) => !prev)}
            />
          ) : (
            <button
              class="btn btn-text"
              type="button"
              onClick={() => navigate(PATHS.LOGIN)}
            >
              로그인
            </button>
          )}
          {showDropdown ? (
            <Dropdown
              themeLabel={themeLabel}
              active={showDropdown}
              onEditProfile={handleEditProfile}
              onEditPassword={handleEditPassword}
              onLogout={handleLogout}
              onToggleTheme={handleToggleTheme}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
