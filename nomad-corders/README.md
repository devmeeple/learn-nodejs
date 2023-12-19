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
