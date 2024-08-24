import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './providers/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

/* user module is responsible for all the management of the providers*/

@Module({
  controllers: [UsersController],
  providers: [UsersService], // providers means providing this particular service to all the local components of user module
  exports: [UsersService], // now available to other modules
  imports: [
    forwardRef(() => AuthModule),// circular dependency between auth module and user module
    TypeOrmModule.forFeature(
      [User]
    )], 
})
export class UsersModule {}
