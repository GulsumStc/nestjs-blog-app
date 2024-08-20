import { Controller, Get, Post, Patch, Delete, Put, Param, Query, Body, Headers, Ip, ParseIntPipe, DefaultValuePipe, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUsersDto } from './dtos/patch-users.dto';

// http://localhost:8000/users
@Controller('users')
export class UsersController {

  /* 
   the @Param() decorator is used to capture route parameters from the URL.
  */
  @Get('/:id?')
  public getUser(
    /*
    when we use ParseIntPipe, we are not able to validate an optional param (id),
    using PaseIntPipe makes this id a required param BUT we want it to be optional so we can create
     DTO for this
    */
    @Param('id') getUsersParamDto : GetUsersParamDto,

    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number
  ) {
    console.log(getUsersParamDto);

    return "Get User";
  }


  @Post()
  public createUsers(
    @Body() createUserDto: CreateUserDto)
  {
    console.log(createUserDto instanceof CreateUserDto); 
    return createUserDto;
  }
  // instead of @Body() we can use @Req() from express


  @Patch()
  public updateUser(@Body() patchUsersDto: PatchUsersDto) {
    
    return patchUsersDto;
  }


}
