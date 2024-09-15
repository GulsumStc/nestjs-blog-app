import { Controller, Get, Post, Patch, Delete, Put, Param, Query, Body, Headers, Ip, ParseIntPipe, DefaultValuePipe, ValidationPipe, UseGuards, SetMetadata } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUsersDto } from './dtos/patch-users.dto';
import { UsersService } from './providers/users.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateManyUsersDto } from './dtos/create-many-users.dto';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';

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
  @ApiOperation({
    summary: 'Fetches a list of registered users on the application',
  })
    @ApiResponse({
      status: 200,
      description: 'User fetched successfully',
    })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: 'number',
    description: 'number of entries returned per query',
    example: 10
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: 'number',
    description: 'the position of the page number that you want the API return',
    example: 1
  })
  public getUser(
    @Param('id') getUsersParamDto : GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number
  ) {
    return this.usersService.findAll(getUsersParamDto, limit, page);
  }


  @Post()
    // @SetMetadata('authType', 'None')
  @Auth(AuthType.NONE,AuthType.BEARER) 
  public createUsers(@Body() createUserDto: CreateUserDto){
    return this.usersService.createUser(createUserDto);
  }

  @Post('create-many')
  public createManyUsers(@Body() createManyUserDto: CreateManyUsersDto){
    return this.usersService.createMany(createManyUserDto);
  }



  @Patch()
  public updateUser(@Body() patchUsersDto: PatchUsersDto) {
    return patchUsersDto;
  }

  


}
