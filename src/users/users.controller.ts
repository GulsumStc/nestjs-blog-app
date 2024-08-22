import { Controller, Get, Post, Patch, Delete, Put, Param, Query, Body, Headers, Ip, ParseIntPipe, DefaultValuePipe, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUsersDto } from './dtos/patch-users.dto';
import { UsersService } from './providers/users.service';
import { ApiTags } from '@nestjs/swagger';

// http://localhost:8000/users
@Controller('users')
@ApiTags('Users') // all the endpoints related to users would come under this group
export class UsersController {
  constructor(
    // inject UsersService
    private readonly usersService: UsersService,
  ) {}
    /*
    when we use ParseIntPipe, we are not able to validate an optional param (id),
    using PaseIntPipe makes this id a required param BUT we want it to be optional so we can create
     DTO for this
    */
  @Get('/:id?')
  public getUser(
    @Param('id') getUsersParamDto : GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number
  ) {
    return this.usersService.findAll(getUsersParamDto, limit, page);
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
