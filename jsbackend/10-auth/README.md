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
