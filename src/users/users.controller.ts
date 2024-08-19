import { Controller, Get, Post, Patch, Delete, Put } from '@nestjs/common';

// http://localhost:8000/users
@Controller('users')
export class UsersController {


  @Get()
  public getUser() {
    return "Get User";
  }


  @Post()
  public createUsers() {
    return "Create User";
  }


  @Put()
  public updateUser() {
    return "Update User";
  }


}
