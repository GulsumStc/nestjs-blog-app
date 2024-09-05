import { Inject, Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { ObjectLiteral, Repository } from 'typeorm';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { Paginated } from '../interfaces/paginated.interface';
import { first } from 'rxjs';


@Injectable()
export class PaginationProvider {

  constructor(
    /* injecting request */
    @Inject(REQUEST)
    private readonly request: Request
  ) { }

  public async paginateQuery<T extends ObjectLiteral> (
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>): Promise<Paginated<T>> {
    let results = await repository.find({
      take: paginationQuery.limit,
      skip: (paginationQuery.page - 1) * paginationQuery.limit

    });


    /* create the request urls */
    const baseURL = this.request.protocol + '://' + this.request.headers.host + '/';
    const newUrl = new URL(this.request.url, baseURL);

    /* calculate page number */

    const totalItems = await repository.count();
    const totalPages = Math.ceil(totalItems / paginationQuery.limit);
    const nextPage = paginationQuery.page === totalPages
      ? paginationQuery.page
      : paginationQuery.page + 1;
    const prePage = paginationQuery.page === 1
      ? paginationQuery.page
      : paginationQuery.page - 1;

    const finalReponse: Paginated<T> = {
      data: results,
      meta: {
        itemsPerPage: paginationQuery.limit,
        totalItems: totalItems,
        currentPage: paginationQuery.page,
        totalPages: totalPages,
      },
      links: {
        first: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=1`,
        last: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${totalPages}`,
        prev: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${prePage}`,
        next: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${nextPage}`,
        current: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${paginationQuery.page}`,
      }
    }
    
    return finalReponse;
  }
  
   
  

}
