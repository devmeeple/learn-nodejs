# 7장 페이지네이션되는 게시판 만들기

### __dirname

현재 모듈의 디렉토리를 표시한다.

```typescript
app.set('views', './views'); // 상대경로
app.set('views', __dirname + '/views'); // 절대경로
```

위치에 따라 위치가 달라지는 것이 상대경로, 위치와 상관없이 일치하는 것을 절대경로라 한다.

- 절대경로: 고유한 경로
- 상대경로: 실행되고 있는 파일위치 기준

## 프로젝트 구조

MVC 패턴을 적용한다.

```text
project-root/
│
├── src/
│   ├── config/
│   │   └── database.ts           // 데이터베이스 설정 파일
│   │   └── templateEngine.ts     // 템플릿 엔진 설정 파일
│   │   └── ...
│   │
│   ├── controllers/
│   │   └── UserController.ts     // 사용자 관련 컨트롤러
│   │   └── OtherController.ts    // 기타 컨트롤러들
│   │   └── ...
│   │
│   ├── models/
│   │   └── User.ts               // 사용자 모델
│   │   └── OtherModel.ts         // 기타 모델들
│   │   └── ...
│   │
│   ├── views/                    // View 템플릿 파일들
│   │   └── index.html
│   │   └── ...
│   │
│   ├── routes/
│   │   └── userRoutes.ts         // 사용자 라우터
│   │   └── otherRoutes.ts        // 기타 라우터들
│   │   └── ...
│   │
│   ├── app.ts                    // 애플리케이션 진입점
│   └── server.ts                 // 서버 시작 로직
│
├── node_modules/                 // npm 패키지들
├── package.json                  // 프로젝트 메타데이터 및 의존성 관리
├── tsconfig.json                 // TypeScript 설정 파일
└── ...
```

- `app.ts`: 애플리케이션을 구성하는 파일. Express, 미들웨어등 기본적인 구성을 정의한다
- `server.ts`: 서버를 시작하는 파일, `app.ts`에서 정의한 객체를 가져와서 포트에 바인딩하고 서버를 시작함
- 서버를 시작할 때 `package.json`에 `main`은 컴파일된 자바스크립트 파일을, 스크립트에는 서버 시작하는 파일 `server.ts`를 정의한다

## API 만들기

- 글: 쓰기(write) -> 전체글 조회(/) -> 상세보기(post) -> 수정(edit), 삭제(delete)
- 댓글: 쓰기 -> 삭제
