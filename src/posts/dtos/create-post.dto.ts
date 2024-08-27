import { IsArray, IsEnum, IsIn, IsInt, IsISO8601, isISO8601, IsJSON, IsNotEmpty, IsOptional, IsString, IsUrl, Matches, MaxLength, MinLength, ValidateNested } from "class-validator";
import { PostStatus } from "../enums/postStatus.enum";
import { PostType } from "../enums/postType.enum";
import { CreatePostMetaOptionDto } from "../../meta-options/dtos/create-post-meta-option.dto";
import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Tag } from "src/tags/tag.entity";

export class CreatePostDto {

  @ApiProperty({
    example: 'This is my post title',
    description: 'The title of the post',
  })
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    enum: PostType,
    description: 'possible values: post, page, story, series',
  })
  @IsEnum(PostType)
  @IsNotEmpty()
  postType: PostType

  @ApiProperty({
    example: 'my-post-slug',
    description: 'only contain lowercase letters, numbers, and dashes',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: 'A slug can only contain lowercase letters, numbers, and dashes' })
  @MaxLength(255)
  slug: string;

  @ApiProperty({
    enum: PostStatus,
    description: 'possible values: draft, published, scheduled, review',
  })
  @IsEnum(PostStatus)
  @IsNotEmpty()
  status: PostStatus;

  @ApiPropertyOptional({
    example: 'This is my post content',
    description: 'The content of the post',
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({
    example: 'T{\"type\":\"object\"}',
    description: 'serialized schema of the post',
  })
  @IsString()
  @IsOptional()
  @IsJSON()
  schema?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/image.jpg',
    description: 'The featured image url of the post',
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(1024)
  featuredImageUrl?: string;

  @ApiPropertyOptional({
    example: '2022-01-01T00:00:00.000Z',
    description: 'The publish date of the post',
  })
  @IsISO8601() // YYYY-MM-DD
  @IsOptional()
  publishOn?: Date;

  
  @ApiPropertyOptional({
    description: 'The tags of the post',
    example: ['1', '2', '3'],
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tags?: number[];


  @ApiPropertyOptional({
    type: 'object',
    required: false,
    items: {
      type: 'object',
      properties: {
        metaValue: {
          type: 'json',
          description: 'The metaValue is a json string',
          example: '{\"key\":\"value\"}',
        }
      },
    }
  
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionDto)
  metaOptions?: CreatePostMetaOptionDto | null;// this is not required property but when you pass metaOptions the key value pair is required object

  @ApiProperty({
    type: 'integer',
    required: true,
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  authorId: number;
}