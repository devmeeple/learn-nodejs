import {
    Column,
    CreateDateColumn,
    Entity, Generated,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn,
} from 'typeorm';

@Entity()
export class UserModel {
    /**
     * ID
     * 자동으로 ID를 생성한다.
     * @PrimaryColumn은 모든 테이블에서 기본적으로 존재해야 한다.
     * 테이블 안에서 각각의 Row를 구분할 수 있는 칼럼이다.
     * @PrimaryColumn()
     *
     * @PrimaryGeneratedColumn('uuid')
     * PrimaryGeneratedColumn -> 순서대로 위로 올라간다.
     * 1, 2, 3, 4, 5 -> 999999
     *
     * UUID
     */

    @PrimaryGeneratedColumn()
    id: number;

    // 제목
    @Column()
    title: string;

    /**
     * 데이터 생성 일자
     * 데이터가 생성되는 날짜와 시간이 자동으로 찍힌다.
     */

    @CreateDateColumn()
    createdAt: Date;

    /**
     * 데이터 업데이트
     * 데이터가 업데이트되는 날짜와 시간이 자동으로 찍힌다.
     */

    @UpdateDateColumn()
    updatedAt: Date;

    /**
     * 데이터가 업데이트 될때마다 1씩 올라간다.
     * 처음 생성되면 값은 1이다.
     * save() 함수가 몇 번 불렸는지 기억한다.
     */
    @VersionColumn()
    version: number;

    @Column()
    @Generated('uuid')
    additionalId: string;

}