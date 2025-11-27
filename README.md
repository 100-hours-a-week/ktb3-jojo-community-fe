# 오늘노래추천

노래 추천 및 플레이리스트 공유 커뮤니티 오늘노래추천의 프론트엔드 레포지토리입니다.

## 1. 프로젝트 개요

- **프로젝트 목적**
  - 하루의 노래 추천
- **주요 기능**
  - 회원 가입 / 로그인 (JWT 기반 인증)
  - 인피니티 스크롤링
  - 게시판 기능 및 댓글, 추천 기능
  - 프로필 수정 및 이미지 업로드

## 2. 기술 스택

vanilla js

## 3. 프로젝트 구조

```shell
└── src
    ├── App.js
    ├── api
    │   ├── constants
    │   │   └── endpoint.js
    │   └── fetchWrapper.js
    ├── assets
    │   └── leftArrow.svg
    ├── index.js
    ├── pages
    │   ├── ArticleDetail
    │   │   ├── articleDetail.css
    │   │   ├── articleDetail.html
    │   │   ├── components
    │   │   │   ├── StatComponent.js
    │   │   │   ├── actionsBtnComponent.js
    │   │   │   ├── articleDetailContainerComponent.js
    │   │   │   ├── commentItemComponent.js
    │   │   │   └── index.js
    │   │   └── js
    │   │       ├── createArticleDetail.js
    │   │       ├── createCommentListener.js
    │   │       └── index.js
    │   ├── ArticleEditor
    │   │   ├── articleEditor.css
    │   │   ├── articleEditor.html
    │   │   ├── articleEditor.js
    │   │   └── components
    │   │       └── ImagePreviewComponent.js
    │   ├── ArticlesList
    │   │   ├── articlesList.css
    │   │   ├── articlesList.html
    │   │   ├── components
    │   │   │   └── ListItemComponent.js
    │   │   └── js
    │   │       ├── createListItem.js
    │   │       └── index.js
    │   ├── Login
    │   │   ├── login.css
    │   │   ├── login.html
    │   │   └── login.js
    │   ├── Signup
    │   │   ├── signup.css
    │   │   ├── signup.html
    │   │   └── signup.js
    │   └── UserProfileEditor
    │       ├── components
    │       │   ├── NicknameEditorComponent.js
    │       │   └── PasswordEditorComponent.js
    │       ├── js
    │       │   └── userProfileEditor.js
    │       ├── userProfileEditor.css
    │       └── userProfileEditor.html
    └── shared
        ├── components
        │   ├── Dropdown.js
        │   ├── Header.js
        │   └── LeftArrow.js
        ├── constants
        │   ├── common.js
        │   ├── error.js
        │   └── paths.js
        ├── lib
        │   ├── domHandler
        │   │   ├── NodeElementClass.js
        │   │   ├── commonHandle.js
        │   │   ├── errorHandle.js
        │   │   └── goBackHandle.js
        │   └── utils
        │       ├── fileToDataUrl.js
        │       ├── getSearchParam.js
        │       ├── invalidateInput.js
        │       └── theme.js
        └── styles
            ├── global.css
            └── layout.css

```

## 4. 동작 영상

<video controls width="700">
  <source src="https://raw.githubusercontent.com/100-hours-a-week/ktb3-jojo-community-fe/jojo/feature/implement-with-vanilla-js/docs/preview.mp4
  " type="video/mp4">
</video>
