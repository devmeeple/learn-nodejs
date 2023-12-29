import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * 인스턴스로 만들지 못하게 추상 클래스로 선언
 * 코드 중복을 줄이고 확장성을 높이며 이는 유지보수를 용이하게 한다. (한 곳에 집중되어 있기 때문에)
 */
export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
