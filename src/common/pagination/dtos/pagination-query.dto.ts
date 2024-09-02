import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";
import { number } from "joi";

export class PaginationQueryDto {

/* 
 * all the properties inside a query are always string so all values would be converted into number -> use Type decorator
 * or use implicit conversion which  refers to the automatic transformation of request parameters, query parameters, 
 * or body data into the desired type or format without requiring manual parsing or conversion. 
*/

  @IsOptional()
  @IsPositive()
  limit: number;
    
  @IsOptional()
  @IsPositive()
  page: number;
}