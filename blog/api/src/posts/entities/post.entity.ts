import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  static create(title: string, content: string) {
    const post = new Post();
    post.title = title;
    post.content = content;
    return post;
  }

  update(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
}
