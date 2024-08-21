import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { GetUsersParamDto } from "../dtos/get-users-param.dto";
import { AuthService } from "src/auth/providers/auth.service";
/* 
All providers must be decorated with @Injectable
*/
Injectable()
export class UsersService {

  constructor(
     @Inject(forwardRef(() => AuthService))
     private readonly usersService: AuthService){ }



  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number
  ) {

    const isAuthenticated = this.usersService.isAuthenticated();
    console.log(isAuthenticated);

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

  public findOneById(id: string) {
    return {
      id: 1234,
      firstName: 'Alice',
      amail: 'a@a.com'
    };
  }


 
}