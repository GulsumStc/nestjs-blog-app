import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PostType } from "./enums/postType.enum";
import { PostStatus } from "./enums/postStatus.enum";
import { CreatePostMetaOptionDto } from "../meta-options/dtos/create-post-meta-option.dto";
import { MetaOption } from "src/meta-options/meta-option.entity";

@Entity()
export class Post {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false }) 
  title: string;

  @Column({ type: 'enum', enum: PostType, nullable: false, default: PostType.POST }) 
  postType: PostType;

  @Column({ type: 'varchar', length: 255, nullable: false }) 
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

  @OneToOne(() => MetaOption)
  @JoinColumn() // will create metaOptinID column  on the Post table, responsible for creating column 
  metaOptions?: MetaOption;

  // you don't have to use joinColumn if you use bidirectional relationship 
  

  tags?: string[];

}
