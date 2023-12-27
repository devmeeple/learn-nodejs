import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from './post.entity';

@Entity('tag')
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => PostEntity, (post) => post.tags)
  posts: PostEntity[];

  @Column()
  name: string;
}
