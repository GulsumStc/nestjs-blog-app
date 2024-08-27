import { Post } from "src/posts/post.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Tag {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
    unique: true
  })
  name: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
    unique: true
  })
  slug: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  description: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  schema: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  featuredImageUrl: string;

  @ManyToMany(() => Post, (post) => post.tags, {
    onDelete: "CASCADE", // you can not delete a tag if there are posts with that tag
  })
  posts: Post[];


  //https://orkhan.gitbook.io/typeorm/docs/decorator-reference
  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @DeleteDateColumn() // its a soft delete  it is not going to delete entire row from the table
  deleteDate: Date;


}