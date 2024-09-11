import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './providers/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ConfigModule } from '@nestjs/config';
import { UsersCreateManyProvider } from './providers/users-create-many.provider';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email.provider';
import databaseConfig from 'src/config/database.config';
import profileConfig from './config/profile.config';
import jwtConfig from 'src/auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';

/* user module is responsible for all the management of the providers*/

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersCreateManyProvider, CreateUserProvider, FindOneUserByEmailProvider], // providers means providing this particular service to all the local components of user module
  exports: [UsersService], // now available to other modules
  imports: [
    forwardRef(() => AuthModule),// circular dependency between auth module and user module
    TypeOrmModule.forFeature([User]), ConfigModule.forFeature(profileConfig),

    ConfigModule.forFeature(jwtConfig),// now we can use the access token guard in order to apply AccessTokenGuard to one of the API endpoints inside the users module
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ], 
  
})
export class UsersModule {}
