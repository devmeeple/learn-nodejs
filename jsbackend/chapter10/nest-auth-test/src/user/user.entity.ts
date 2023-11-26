import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ unique: true })
    email: string; // 이메일은 유니크 값

    @Column()
    password: string;

    @Column()
    username: string;

    @Column({ default: true }) // 기본값을 넣어줌
    createdDt: Date = new Date();
}
