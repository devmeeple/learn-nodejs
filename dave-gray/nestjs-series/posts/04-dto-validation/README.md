# 04. DTO Validation

- DTO 타입을 추가하고 기존 코드 리팩터링 진행
- 검증

서버로 전송되는 모든 데이터는 유효성 검증을 거쳐야한다. 유효성 검증을 위해 네스트는 파이프를 제공한다.

## Pipes

## DTO(Data Transfer Object)

DTO란 계층 간 데이터 교환을 위해 도메인 모델 대신 사용되는 객체이다. DTO는 계층간의 결합을 느슨하게 만드는데 사용한다.

## Validation

```shell
yarn add class-validator class-transformer # 두 패키지를 함께 설치한다.
```

검증하고 싶은 내용을 데코레이터로 추가한다.

- 유효성 검증을 앱에 전반적으로 사용하고 싶을 때 `app.useGlobalPipes(new ValidationPipe())`를 추가한다. 설정을 추가하면 class-validator로 설정한 프로퍼티는 모두
  검증된다.

- DTO를 선언할 때 인터페이스 혹은 클래스를 사용할 수 있다. 클래스는 런타임에도 사라지지 않기 때문에 클래스로 선언하는 방법을 권장한다.

```shell
yarn add -D @nestjs/mapped-types
yarn add class-validator class-transformer
```

## 참고

> - Controllers > Request payloads
> - Validation > PartialType
> - Exception filters
