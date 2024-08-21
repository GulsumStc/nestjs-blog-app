import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './providers/users.service';

/* user module is responsible for all the management of the providers*/

@Module({
  controllers: [UsersController],
  providers: [UsersService], // providers means providing this particular service to all the local components of user module
})
export class UsersModule {}
