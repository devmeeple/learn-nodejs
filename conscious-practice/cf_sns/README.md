# 의식적인 연습

제공되는 강의에 테스트를 추가하고 정리한다.

## 5. 쿼리와 파라미터

다음은 REST API 기본 설계 예시이다. GET 요청을 제외하고는 대부분 Body를 사용한다.

```text
[GET] /posts 
> 다수의 글을 가져온다. (전체조회)
[GET] /posts/10 
> 10이라는 id를 가진 글을 가져온다. (단건조회)
[POST] /posts 
> 새로운 글을 작성한다. (글 작성)
[PATCH] /posts/10 
> 10이라는 id를 가진 글을 부분 변경한다. (업데이트/수정)
[PUT] /posts/10
> 10이라는 id를 가진 글을 전체 변경하거나 생성한다. (업데이트/수정)
[DELETE] /posts/10
> 10이라는 id를 가진 글을 삭제한다. (삭제)
```

- PATCH VS PUT
    - PATCH는 변경하고 싶은 부분만 전송해도 되지만, PUT은 필요한 데이터 전체를 전송해야 한다.

### Exception

[상위 4개](https://docs.nestjs.com/exception-filters)의 항목을 주로 사용한다.

## 6. 서비스

- 아키텍처(Architecture): 서비스의 동작원리를 나타낸다.
    - 컨트롤러는 HTTP 요청을 담당한다.
        - 가장 앞선에서 HTTP 요청이 어떤 함수로 실행되어야 할 지(라우트)를 결정한다.
        - 더 복잡한 작업은 provider 에게 요청한다.
    - 서비스는 비즈니스 로직을 담당한다.
        - 논리를 담당한다.
        - 컨트롤러에서 서비스 파일을 요청한다.
- 프로바이더(Providers): 주입될 수 있는 객체를 의미한다.

## 7. Module, Provider and Inversion of Control (제어의 역전)

> 인스턴스는 클래스의 정의를 통해 만들어진 객체를 의미한다.

### 의존성 주입(Dependency Injection)

의존하고 있는 클래스를 인스턴스화하여 직접 주입해 준다. (일반적인 방법)

### Inversion of Control (제어의 역전)

의존하는 인스턴스를 사용자가 직접 주입하던 과정을 프레임워크가 대신 담당 해준다. 프레임워크가 작업을 대신해 주기 때문에
사용자는 인스턴스의 생성과 폐기를 전혀 신경 쓰지 않고 기능에 집중할 수 있다.

**프로바이더**는 NestJS에서 일반적으로 사용하는 이름으로 생성자(constructor)에 정의함으로 써 주입을 받을 수 있다.

- 프레임워크는 서비스를 모듈(module)에 등록해 두어야만 IOC 컨테이너가 인지할 수 있다.

```typescript
@Module({
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {
}
```

서비스, 리포지토리는 어떤 역할을 하는지 지칭하는 명칭이다.

- 프로바이더로 사용하고 싶은 클래스는 2가지 과정을 거쳐야 한다.
    1. 모듈에 등록한다.
    2. `@Injectable()` 데코레이터 사용: 클래스가 주입할 수 있는 클래스라고 지정해야 한다.

- imports는 다른 모듈을 불러올 때 사용한다.
    - 사용자가 직접 파일을 정의한다면 `app.module.ts`에도 직접 정의해야 한다. 하지만 `CLI`를 사용해서 모듈을 정의했다면 자동으로 등록된다.

## 8. SQL & Docker

하드디스크에 있던 코드는 실행되면 RAM에 올라가게 된다. RAM에만 올라가 있을 경우 재실행 됐을 때 데이터는 초기화 된다.

- 프로그램이 종료되더라도 데이터를 유지하기 위해서는 HDD/SSD에 저장해야 한다.

### SQL(Structured Query Language)

기본적인 SQL문

- SELECT: 테이블 선택하기
    - `SELECT {column} FROM {table};`
    - `SELECT id, author, title, content FROM post;`
- UPDATE: 데이터 업데이트하기
    - `UPDATE {table} SET {column} WHERE {condition}`
    - `UPDATE post SET title = '안녕하세요' WHERE id = 3;`
- DELETE: 테이블 삭제하기
    - `DELETE FROM {table} WHERE {condition};`
    - `DELETE FROM post WHERE author = '미플';`
- INSERT: 데이터 추가하기
    - `INSERT INTO {table} {column1, column2...} VALUES {value1, value2...};`
    - `INSERT INTO post (title, content) VALUES ('안녕하세요', '피곤하네요');`

### Docker 이론

방대한 개념이지만 가볍게 알아본다. 추후 도커를 사용해 배포한다.

- 작성된 프로그램은 여러 환경에서 실행 할 수 있어야 한다. 과거에는 환경의 차이로 실행되지 않는 경우가 많았다.
  하지만 현대에 들어서는 도커로 해당 문제를 많이 해결 해 준다.
- 도커는 도커파일에 여러 설치 절차(환경구성) 정의한다. 도커가 설치된 환경이라면 똑같은 환경에서 실행할 수 있도록
  문제를 해결한다.
- 도커의 등장은 CI/CD의 혁신적인 변화로 이끌었다.

도커는 특정 프로그램을 실행할 때 필요한 환경구성(패키지, 명령어 등) 작업을 도커파일이라는 하나의 컨테이너로 묶어서
멀티플랫폼 문제를 해결한다.

### Docker Compose 이론

증가하는 컨테이너들을 제어하기 위해 등장한 기술들 중 `Docker Compose`에 대해 알아보자.

- Docker Compose는 하나의 기기에서 여러 컨테이너를 구동하는데 최적화 된 기술이다.

> 현대의 애플리케이션은 프로덕션 환경에서 쿠버네티스, 로컬환경에서는 도커 컴포즈를 많이 사용한다.

### Docker 환경구성

- [Docker](https://www.docker.com/) 앱을 다운로드 한다.
- Docker Compose 파일 작성하기
    - 이미지는 [dockerhub](https://hub.docker.com/)를 이용한다.
    - 가능하다면 공식 이미지를 사용한다.
- 예시 파일
    ```yaml
    # docker-compose.yaml
    services: # 실행할 서비스를 정의(여러개 사용 가능)
      postgres:
        image: 이미지:버전
        restart: always
        volumes: # 데이터 유지를 위해 매핑
          - ./프로젝트 디렉토리:/이미지 디렉토리 
        # ./postgres-data:/var/lib/postgresql/data
        ports:
          - "프로젝트 포트:이미지 포트"
        environment:
          데이터베이스_사용자: 사용자명
          데이터베이스_비밀번호: 비밀번호
          데이터베이스_이름: 데이터베이스 이름
    ```

> 도커가 실행 중 인지 먼저 확인할 것

- `docker-compose up`: 실행
- `docker-compose down`: 종료 / `Ctrl + C`: 정지

## 9. TypeORM 사용해보기

- [공식문서](https://docs.nestjs.com/techniques/database)

### 설정하기

설정은 크게 두가지 과정을 거쳐야 한다.

1. 패키지 설치 및 선언
2. Repository 주입

```shell
yarn add @nestjs/typeorm typeorm [데이터베이스]
# npm install --save @nestjs/typeorm typeorm [데이터베이스]
```

```typescript
// app.module.ts
imports: [
  // 환경변수로 수정할 수 있다
  TypeOrmModule.forRoot({
    type: '데이터베이스',
    host: '서버주소',
    port: 포트,
    username: '사용자명',
    password: '비밀번호',
    database: '데이터베이스 이름',
    entities: [],
    synchronize: true,
    logging: true,
  }),
]
```

> synchronize: true 해당 옵션은 주의를 요한다. 개발환경에서는 true로 하는 것이 편리하지만, 프로덕션 환경에서는
> 의도치 않은 변화가 발생할 수 있기때문에 false를 사용한다.

모든 테이블에는 절대적으로 유일무이한 1개의 컬럼(column)이 있어야 한다.

2. 리포지토리(Repository) 주입하기

리포지토리는 엔티티(클래스로 작성된 테이블)와 연결해 주는 징검다리 역할을 한다.

- `TypeOrmModule.forRoot`: TypeORM 패키지 자체를 연결한다.
- `TypeOrmModule.forFeature()`: 레포지토리를 주입한다.

### 개선

메모리 데이터베이스 환경에서 실제 데이터베이스로 이전한다.

> repository의 함수는 모두 비동기다. 따라서 비동기 함수로 선언한다.

- find(): 다수의 데이터 조회하기(전체)
- findOne(): 단건조회
- create(): 저장 할 객체를 생성한다. (객체만 생성하기 때문에 동기)
- save()
    - 데이터가 존재하지 않는다면 새로 생성
    - 데이터가 이미 있다면 덮어 씌움
- delete(): 데이터 삭제

## 10. Typeorm 이론

- 프로젝트 세팅

```text
nest new [프로젝트 이름]
yarn add @nestjs/typeorm typeorm pg
docker-compose up
```

### Column Decorator

- **자주사용하는 요소**
- @PrimaryGeneratedColumn(): 자동으로 ID를 증가시킨다.
    - @PrimaryGeneratedColumn('uuid'): 유일무이한 값을 uuid 로 생성한다.
- @PrimaryColumn(): 테이블에서 각 row를 기본으로 구분할 수 있는 컬럼을 직접 넣겠다.
- @CreatedDateColumn(): 데이터 생성날짜와 시간이 자동으로 입력
- @UpdatedDateColumn(): 데이터 수정날짜와 시간이 자동으로 입력
- @VersionColumn(): 데이터가 수정 될 때마다 1씩 올라간다. 처음 생성시 값은 1
    - save() 함수가 몇 번 호출되었는지 확인
- @Column()
    - @Generated('increment'): 기본 칼럼은 아닌데 값을 증가시킴(number)
    - @Generated('uuid'): uuid로 생성(string)

### Column Property

타입스크립트의 타입으로 칼럼이 유추되어 자동 생성된다. 하지만 특정 값으로 명시하고 싶은 경우
`type: 타입` 으로 데이터베이스의 타입으로 바꿀 수 있다.

- type: 데이터베이스 타입
- name: 칼럼 이름
- length: 값의 길이(입력할 수 있는 글자의 수)
- nullable: boolean: null 값이 가능한지 여부
- update: boolean: true 생성 시 값 지정 이후 변경 불가능
- select: boolean: 기본값 true / find() 조회 함수 사용시 값을 불러올 수 있는지, 원하는 값만 가져올 수 있음
- default: 입력하지 않았을 때 기본값
- unique: boolean: 기본값 false / 유일무이한 값이어야 하는지 여부 (회원가입 이메일에 사용)

### Enum Column

Enum을 사용할 수 있다.



