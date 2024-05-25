import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  // 중복 금지 중복값을 추가할 경우 에러 발생
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @CreateDateColumn()
  createdAt: Date;
}
