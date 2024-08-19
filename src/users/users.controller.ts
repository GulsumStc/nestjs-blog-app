import { Controller, Get, Post, Patch, Delete, Put, Param, Query, Body, Headers, Ip } from '@nestjs/common';

// http://localhost:8000/users
@Controller('users')
export class UsersController {

  /* 
   the @Param() decorator is used to capture route parameters from the URL.
  */
  @Get('/:id/:optional?')
  public getUser(@Param('id') id: any, @Query('limit') limit: any) {
    console.log(id);
    console.log(limit);
    return "Get User";
  }


  @Post()
  public createUsers
    (
    @Body() request: any,
    @Headers() headers: any,
    @Ip() ip: any  // ip contains the client's IP address
    )
  {
    console.log(ip)
    console.log(headers)
    return request;
  }
  // instead of @Body() we can use @Req() from express


  @Put()
  public updateUser() {
    return "Update User";
  }


}
