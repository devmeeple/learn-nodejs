# BaseEntity

> *데이터가 왜 소중한지 이야기하며 시작한다. 설명과 구체적인 사용 예시를 들어 이해를 돕는다.

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
- 추상 클래스를 사용하는 이유는 직접 '인스턴스화'할 상황이 없기 때문이다. 하위 클래스는 공통 기능을 상속받아 사용한다. 더불어 일관성을 유지하고, 코드 중복을 피한다.

*예시:

게시판을 제공하는 서비스를 운영한다. 게시글을 목록을 어떻게 정리하면 좋을까.
기본키(PK, Primary Key)가 아닌 작성시간(createDate)으로 정렬 가능하다.(내림차순, 오름차순)
더불어 기능뿐만 아니라 운영에 필요한 데이터를 조회할 때도 유용하게 사용한다.

이처럼 데이터의 생성 및 수정시간을 공통으로 관리하기 위해서는 공통 프로퍼티를 엔티티마다 정의하는 방식이 아닌 BaseEntity를 선언하고
상속하는 방식을 권장한다.

> Q. 기본키(PK, Primary Key)로 조회하면 되지 않을까
>
> A. 기본키를 관리할 때 AUTO_INCREMENT 속성을 주로 사용했다. 하지만 UUID로 변경하면 어떻게 구현할까.
> AUTO_INCREMENT는 순차적으로 증가하는 숫자를 이용한다. 반면 UUID는 전역으로 고유한 값을 생성하기 때문에 위 예시에 방법으로 처리할 수 없다.
> 특히 시간에 따라 변하지 않는 데이터를 관리할 때 'timestamp' 필드가 더욱 중요하다.

## 사용하기

```typescript
@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;
}
```

> id 프로퍼티 또한 BaseEntity에 선언하는 방식도 있다. 하지만 개인적으로 선호하지 않는다. 모든 엔티티가 동일한 생성 전략을 사용하지 않을 수 있기 때문이다.
> 만약 동일한 생성 전략을 사용하는 방식이 확실하다면 상속받아 사용할 수 있다.

## 마치며

- Date 객체의 문제점, 다른 방법으로 해결하기
- UTC 시간으로 데이터가 저장된다. 한국어로 서비스하면 어떻게 할까.
- 국제화가 진행되는 서비스는 시간을 어떻게 저장할까.

**<참고 자료>**

- JPA Auditing BaseEntity
- 『스프링 부트와 AWS로 혼자 구현하는 웹 서비스』(이동욱, 프리렉, 2019)[https://product.kyobobook.co.kr/detail/S000001019679]
