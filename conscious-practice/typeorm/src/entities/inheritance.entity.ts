import {
  ChildEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
} from 'typeorm';

export class BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('book')
export class BookEntity extends BaseModel {
  @Column()
  title: string;
}

@Entity('car')
export class CarEntity extends BaseModel {
  @Column()
  brand: string;
}

@Entity()
@TableInheritance({
  column: {
    name: 'type',
    type: 'varchar',
  },
})
export class SingleBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@ChildEntity()
export class ComputerEntity extends SingleBaseEntity {
  @Column()
  brand: string;
}

@ChildEntity()
export class AirplaneEntity extends SingleBaseEntity {
  @Column()
  country: string;
}
