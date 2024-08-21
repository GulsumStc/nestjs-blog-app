import { Injectable } from "@nestjs/common";
import { GetUsersParamDto } from "../dtos/get-users-param.dto";
/* 
All providers must be decorated with @Injectable
*/
Injectable()
export class UsersService {


  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number
  ) {

    return [
      {
        firstName: 'John',
        email: 'j@j.com'
      },
      {
        firstName: 'Jane',
        email: 'j@j.com'
      }
    ]
  }


 
}