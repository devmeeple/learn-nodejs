# BaseEntity

데이터는 소중하다. 중요하다. 모든 기능에서 데이터의 생성시간, 수정시간이 필요하다. 어떻게 문제를 해결할까.

## 정의하기

```typescript
// base.entity.ts
export abstract class BaseEntity {
  @CreatedDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
```

- 공통으로 사용하는 프로퍼티를 정의하고 상속으로 해결한다.
- abstract로 선언하는 이유는 BaseEntity를 직접적으로 인스턴스화해서 사용할 필요가 없기 때문이다.

예를 들어 운영하는 서비스에서 게시판을 제공한다. 정렬기준이 '작성시간'이면 어떻게 정렬하면 좋을까.
기능이 아니더라도 운영에 필요한 데이터를 조회할 때 사용할 공통 칼럼을 정의한다.

> Q. 기본키(PK, Primary Key)로 조회하면 되지 않을까
>
> A. AUTO_INCREMENT 속성을 주로 사용한다. 하지만 UUID로 변경하면 어떻게 구현할까.

글을 처음 작성한 시간은 변하지 않는다.

## 사용하기

```typescript
@Entity
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;
}
```

> id 프로퍼티도 BaseEntity에 선언하는 방식도 있지만 개인적으로 선호하지 않는다. 모든 엔티티가 동일한 생성 전략을 사용하지 않기 위해서다.
> 만약 동일한 생성 전략을 사용하는 방식이 확실하다면 상속받아 사용할 수 있다.

## 마치며

- Date 객체의 문제점, 다른 방법으로 해결하기
- UTC 시간으로 데이터가 저장된다. 한국어로 서비스하면 어떻게 할까.
- 국제화가 진행되는 서비스는 시간을 어떻게 저장할까.

**<참고 자료>**

- JPA Auditing BaseEntity
- 『스프링 부트와 AWS로 혼자 구현하는 웹 서비스』(이동욱, 프리렉, 2019)[https://product.kyobobook.co.kr/detail/S000001019679]
