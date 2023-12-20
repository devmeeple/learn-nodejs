# NestJS로 API 만들기

[노마드코더](https://nomadcoders.co/nestjs-fundamentals)에서 제공하는 무료 강의 정리

## 0. INTRODUCTION

```shell
npm i -g @nestjs/cli
nest new [프로젝트 이름]
```

- 가장 많이 사용하는 방법이다. (물론 `git clone`을 사용해서 프로젝트를 시작할 수도 있지만 기본구조를 잡는데는 편리한 방법이다.)

## 1. ARCHITECTURE OF NESTJS

- 아키텍처 패턴을 적용하여 스파게티 코드를 해결한다.

### Module

- 어플리케이션의 일부분이다. 각 모듈은 각 역할을 가진다.
    - 예) 인증을 담당하는 users 모듈
- `app.module.ts`는 root 모듈이다.
    - 어플리케이션을 실행시키기 위해서는 최소 한개의 모듈을 필요로한다.
    - 어플리케이션에 사용되는 모듈은 해당 파일에 정의해되어야 한다.

### Controller

- 어플리케이션의 요청을 수신하고 경로를 처리한다.

### Service

- 비즈니스 로직만을 포함한다. 예를들어 데이터 생성, 저장 및 업데이트가 포함된다.

## 2. REST API

### DTO와 유효성 검증

- DTO는 왜 필요할까?
    - DTO는 계층간 데이터 전송을 목적으로 사용되는 객체이다.
    - 단일 책임 원칙(SRP)을 위반하지 않기 위해서 사용된다.
    - `readonly` 키워드를 사용해서 불변성을 보장한다.
- [유효성 검증](https://docs.nestjs.com/techniques/validation)
    - 요청된 데이터를 검증하는 것은 매우 중요한 작업이다.
    - 파이프를 사용해 데이터를 검증하고 원하는 형식으로 변환한다.

```shell
yarn add class-validator class-transformer
```

```typescript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
);
```

- whitelist: 검증 대상에 해당되지 않는 요청을 제거한다.
- forbidNonWhitelisted: 제거하지 않고 예외를 발생시킨다.
- transform: 자동변환

### Mapped Type

```shell
yarn add @nestjs/mapped-types
```

- [Mapped Type](https://docs.nestjs.com/openapi/mapped-types)을 사용해서 재사용성을 높인다.
- PartialType: 모든 속성이 선택사항으로 변경된다.

## 3. UNIT TESTING

단위테스트란 함수같은 하나의 단위를 테스트하는 방법이다.

- 테스트가 충분히 작성되었는지 커버지리를 통해 확인할 수 있다. (100%의 함정에 빠지지 말자.)

```shell
yarn test:cov # npm rub test:cov
```

- 테스트 파일의 변경을 확인하고 변경된 테스트를 실행 시킬 수 있다.

```shell
yarn test:watch # npm run test:watch
```

