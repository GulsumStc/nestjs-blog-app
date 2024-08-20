import { Controller, Get, Post, Patch, Delete, Put, Param, Query, Body, Headers, Ip, ParseIntPipe, DefaultValuePipe, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

// http://localhost:8000/users
@Controller('users')
export class UsersController {

  /* 
   the @Param() decorator is used to capture route parameters from the URL.
  */
  @Get('/:id?')
  public getUser(
    // ParseIntPipe is used to convert the id to numberand it is not a decorator
    @Param('id', ParseIntPipe) id: number | undefined, // undefined because id is optional
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number
  ) {
    console.log(limit);
    console.log(page);
    return "Get User";
  }


  @Post()
  public createUsers(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto)
  {
    return createUserDto;
  }
  // instead of @Body() we can use @Req() from express


  @Put()
  public updateUser() {
    return "Update User";
  }


}
