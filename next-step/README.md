# Node HTTP 웹 서버 구현

프레임워크를 사용하지 않고 Node 환경에서 HTTP 웹 서버를 구현한다.

## 요구사항 0 - 개발환경 구성

### 필수 패키지

* ts-node-dev VS nodemon

```shell
npx tsc --init
yarn init
mkdir src && touch src/app.ts
yarn add typescript ts-node-dev @types/node -D # 개발 종속성으로 설치
```

### 테스트 환경 구성

모두 개발 의존성으로 설치한다

* jest: 테스트 프레임워크
* ts-jest: 타입스크립트로 작성된 프로젝트를 테스트할 수 있게 지원하는 전처리기
* supertest: API 테스트에 유용
* @types/jest
* @types/supertest

```shell
yarn add jest ts-jest supertest @types/jest @types/supertest -D
```

## 요구사항 1 - `index.html` 응답하기

## 요구사항 2 - GET 방식으로 회원가입하기

* 회원가입 메뉴를 클릭하면 `/user/form.html`으로 이동해서 회원가입
* 요청값을 서버에 전달, 입력한 값을 저장

## 요구사항 3 - POST 방식으로 회원가입하기

form 태그 method를 get에서 post로 수정한 후 회원가입