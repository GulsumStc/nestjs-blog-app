import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {  IsInt, IsOptional } from "class-validator";

export class GetUsersParamDto {
  @ApiPropertyOptional({
    description: 'The id of the user',
    example: 123
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)  // to convert id number
  id?: number;
}