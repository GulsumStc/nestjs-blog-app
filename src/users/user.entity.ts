import { Exclude } from "class-transformer";
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
  @Exclude()// when used with classSerializerInterceptor Interceptor would endsure that this password is not sent back in the response
  password: string;


  @OneToMany(()=>Post, (post)=>post.author)
  posts: Post[];


}