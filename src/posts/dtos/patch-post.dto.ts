// import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty, PartialType } from "@nestjs/swagger"; // why we import PartialType from swagger is  to add all properties in swagger
import { IsInt, IsNotEmpty } from "class-validator";
import { CreatePostDto } from "./create-post.dto";


export class PatchPostDto extends PartialType(CreatePostDto){ 

  @ApiProperty({
    description:'The Id of the post that needs to be updated',
  })
  @IsInt()
  @IsNotEmpty()
  id: number;
  
}