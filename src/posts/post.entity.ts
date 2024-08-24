import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { PostType } from "./enums/postType.enum";
import { PostStatus } from "./enums/postStatus.enum";
import { CreatePostMetaOptionDto } from "../meta-options/dtos/create-post-meta-option.dto";

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

  
 // work on these later on relationships
  tags?: string[];
  metaOptions?: CreatePostMetaOptionDto[];

}
