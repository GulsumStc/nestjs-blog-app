import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
    length: 512,
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

  //https://orkhan.gitbook.io/typeorm/docs/decorator-reference
  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @DeleteDateColumn() // its a soft delete  it is not going to delete entire row from the table
  deleteDate: Date;


}