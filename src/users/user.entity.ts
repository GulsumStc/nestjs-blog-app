import { Post } from "src/posts/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 40,
    nullable: false,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 40,
  })
  lastName: string;

  @Column({
    unique: true,
    nullable: false,
    type: 'varchar',
  })
  email: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length:96
  })
  password: string;


  @OneToMany(()=>Post, (post)=>post.author)
  posts: Post[];


}