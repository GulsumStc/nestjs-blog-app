import { IsDate, IsOptional } from "class-validator";
import { IntersectionType } from "@nestjs/swagger"; //  allows you to combine two DTOs into one
import { PaginationQueryDto } from "src/common/pagination/dtos/pagination-query.dto"; // for pagination

class GetPostsBaseDto { // This class will allow you to filter posts based on a start date and an end date.

  @IsOptional()
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @IsDate()
  endDate?: Date;
}

export class GetPostsDto extends IntersectionType(PaginationQueryDto, GetPostsBaseDto) { 

  /* 
    This  class allows you to make requests like:

      Pagination: /posts?page=1&limit=10
      Date Filtering: /posts?startDate=1630454400000&endDate=1633046400000
      Combined: /posts?page=1&limit=10&startDate=1630454400000&endDate=1633046400000

  */

}