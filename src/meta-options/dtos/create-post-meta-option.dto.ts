import { IsJSON, IsNotEmpty, isNotEmpty, IsString, isString } from "class-validator";

export class CreatePostMetaOptionDto {

  @IsNotEmpty()
  @IsString()
  metaValue: string; // or JSON

}