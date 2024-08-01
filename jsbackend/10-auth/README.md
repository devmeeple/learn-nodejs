# Nest Auth Test

> 목표: 쿠키와 세션을 사용해 인증기능을 구현한다.
>
> 요구사항
> * 회원가입
> * 쿠키를 사용한 로그인
> * 세션을 이용한 인증정보 저장

인증(Authentication)은 "당신은 누구십니까" 묻는다. 반면 인가(Authorization)는 '인증된 사용자의 권한을 확인'한다.

**<참고 문서>**

* [NestJS 'Authentication'](https://docs.nestjs.com/security/authentication)
* [박승규 『Node.js 백엔드 개발자 되기』](https://product.kyobobook.co.kr/detail/S000201457949)

AppModule: 전체 애플리케이션 설정
UsersModule: 유저 데이터
AuthModule: 인증

## 데이터베이스 설정

```shell
yarn add @nestjs/typeorm typeorm sqlite3
```

테이블과 매핑하는 클래스를 '엔티티(Entity)'라고 한다.

## UsersModule

> * `POST /users`: 유저 등록
> * `GET /users/{email}`: 유저 상세 조회
> * `PUT /users/{email}`: 정보 수정
> * `DELETE /users/{email}`: 삭제

* **유저 등록 기능**
    * 사용자가 이메일(email), 이름(username), 비밀번호(password)를 입력하면 유저가 등록된다.
    * 이메일을 잘못 입력하면 에러가 발생한다.
* **유저 상세 조회 기능**
    * 사용자는 이메일(email)을 사용해 상세 정보를 조회할 수 있다.
    * 등록하지 않은 유저를 조회하면 에러가 발생한다.
* **유저 수정 기능**
    * 사용자는 이름(username), 비밀번호(password)를 수정할 수 있다.
* **유저 삭제 기능**
    * 사용자는 이메일(email)을 사용해 정보를 삭제할 수 있다.
    * 이메일을 잘못 입력하면 삭제에 실패한다.

### 파이프로 유효성 검증하기

```shell
yarn add class-validator class-transformer
```

> * `class-transformer`: JSON 요청 정보(payload)를 클래스 객체로 변경한다.
> * `class-validator`: 데코레이터를 사용해서 유효성 검증을 한다.

* `class-validator`에서 제공하는 데코레이터로(decorator)로 유효성 검사를 실행한다.
* DTO(Data Transfer Object) 단위 테스트 코드를 추가한다.

**<리팩터링>**

* `set-config.ts`: 글로벌 설정을 별도의 함수로 만들어서 분리한다.
* `message`를 일반화시키고 관리한다.

**<참고 자료>**

* [NestJS 'Validation'](https://docs.nestjs.com/techniques/validation)
* [향로 'NestJS에서 응답/요청 객체 직렬화(Serialization) 하기](https://jojoldu.tistory.com/610)
* [코드팩토리 'Validation Message 일반화 하기'](https://inf.run/Xt6jc)

## 인증 모듈(Auth Module)

### 만들기

```shell
nest g mo auth
nest g s auth --no-spec
nest g co auth --no-spec
```

### 구조

> * `POST /auth/register`: 유저를 등록
> * `POST /auth/login`: 로그인
> * `POST /auth/logout`: 로그아웃

### 설정하기

유저 서비스를 내보내기(exports)하고 인증 모듈에서 주입받는다.
