import { IsNotEmpty, isNotEmpty, IsString, isString } from "class-validator";

export class CreatePostMetaOptionDto {

  @IsString()
  @IsNotEmpty()
  key: string;
  
  
  @IsNotEmpty()
  value: any;

}