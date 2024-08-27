import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PostType } from "./enums/postType.enum";
import { PostStatus } from "./enums/postStatus.enum";
import { CreatePostMetaOptionDto } from "../meta-options/dtos/create-post-meta-option.dto";
import { MetaOption } from "src/meta-options/meta-option.entity";
import { User } from "src/users/user.entity";
import { Tag } from "src/tags/tag.entity";

@Entity()
export class Post {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false }) 
  title: string;

  @Column({ type: 'enum', enum: PostType, nullable: false, default: PostType.POST }) 
  postType: PostType;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true }) 
  slug: string;

  @Column({ type: 'enum', enum: PostStatus, nullable: false, default: PostStatus.DRAFT }) 
  status: PostStatus;

  @Column({ type: 'text', nullable: true }) 
  content?: string;

  @Column({ type: 'text', nullable: true }) 
  schema?: string;

  @Column({ type: 'varchar', length: 1024, nullable: true }) 
  featuredImageUrl?: string;

  @Column({ type: 'timestamp', nullable: true })  // 'datetime' in mysql
  publishOn?: Date;

  @OneToOne(() => MetaOption, (metaOptions) => metaOptions.post,
    {
    cascade: true, // this will create a new metaOption when a new post is created
    // cascade: ['insert', 'update', 'remove', 'soft-delete', 'recover']
    eager: true, //when ever typeorm fetch a post, it will fetch the metaOptions as well but for that we used relation in post service
  })
  // @JoinColumn() // will create metaOptinID column  on the Post table, responsible for creating column 
  metaOptions?: MetaOption;

  // you don't have to use joinColumn if you use bidirectional relationship
  
  
  @ManyToOne(() => User, (user) => user.posts, {
    eager: true
  })
  author: User;

  /* 
  ManyToMany:
  - Defines a many-to-many relationship between two entities.
  - Each entity can have multiple related entities on the other side of the relationship.
  - Requires a join (junction) table to store the relationships.
  - Use @ManyToMany decorator on both entities to establish the relationship.
  - One side of the relationship should use @JoinTable to define the junction table
  */

  // the owner of relation is the post
  @ManyToMany(() => Tag, (tag)=> tag.posts, {
    eager: true
  })
  @JoinTable()
  tags?: Tag[];

}
