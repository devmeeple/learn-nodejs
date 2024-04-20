# 09. 노드버드 SNS 만들기

프로젝트를 생성할 때 버전을 최소화하여 생성해야 버전업이 쉽다

## 프로젝트 구조 갖추기

```shell
npm init -y # 프로젝트 생성
npm i sequelize mysql2 sequlize-cli # 데이터베이스 드라이버
npx sequelize-cli init

npm i express cookie-parser express-session morgan multer dotenv nunjucks
npm i nodemon -D
```

- sequlize: ORM
- mysql2: mysql 드라이버
- sequlize-cli: 인터페이스

- cookie-parser: Cookie 헤더 구문을 분석
- express-session: 세션 미들웨어
- morgan: node.js용 HTTP 요청 로거 미들웨어
- multer: 파일 업로드 미들웨어
- nunjucks: 템플릿 엔진

### npx

npx는 전역으로 패키지를 설치하지 않고도 패키지의 명령어를 실행하게 도와주는 도구다.

## 요구사항

- MVC 구조, Layered Architecture 란 무엇인가?
- 프론트 엔드 페이지 구성
- 테스트 코드 작성
