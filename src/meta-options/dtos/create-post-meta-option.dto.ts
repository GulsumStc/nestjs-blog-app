import { IsJSON, IsNotEmpty, isNotEmpty, IsString, isString } from "class-validator";

export class CreatePostMetaOptionDto {

  @IsNotEmpty()
  @IsJSON()
  metaValue: string; // or JSON

}