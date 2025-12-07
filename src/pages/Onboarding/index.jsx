import { createElement } from "../../vdom.js";
import { useNavigate } from "../../core/router.js";
import { PATHS } from "../../shared/routing/paths.js";

export default function OnboardingPage() {
  return (
    <section class="hero-section">
      <div class="hero-background-image" />
      <div class="hero-overlay" />

      <div class="hero-container">
        <div class="hero-content">
          <h1 class="hero-title">
            SoundSpace에서 음악을 공유하고
            <br />
            <span class="hero-title-gradient">새로운 사운드를 발견하세요</span>
          </h1>
          <p class="hero-subtitle">
            좋아하는 곡을 추천하고, 다른 유저들과 소통하며, 새로운 곡을
            플레이리스트에 추가해보세요.
          </p>

          <div class="hero-actions">
            <button
              class="hero-btn hero-btn-primary"
              onClick={() => {
                useNavigate(PATHS.SIGNUP);
              }}
            >
              시작하기
            </button>
            <button
              class="hero-btn hero-btn-secondary"
              onClick={() => {
                useNavigate(PATHS.LOGIN);
              }}
            >
              로그인
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
