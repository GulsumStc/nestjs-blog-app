import { Inject, Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { ObjectLiteral, Repository } from 'typeorm';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';


@Injectable()
export class PaginationProvider {

  constructor(
    /* injecting request */
    @Inject(REQUEST)
    private readonly request: Request
  ) { }

  public async paginateQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>) {
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

    
    return results;
  }

}
