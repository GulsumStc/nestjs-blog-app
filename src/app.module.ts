import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Post } from './posts/post.entity';
import { TagsModule } from './tags/tags.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PaginationModule } from './common/pagination/pagination.module';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import  environmentValidation from './config/environment.validation';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './auth/config/jwt.config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AccessTokenGuard } from './auth/guards/access-token/access-token.guard';
import { AuthenticationGuard } from './auth/guards/authentication/authentication.guard';
import { DataResponseInterceptor } from './common/interceptors/data-response/data-response.interceptor';

const ENV = process.env.NODE_ENV;
console.log(ENV);

@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, //makes it available to all modules or you would have to import it every other module that you create and when ever you want to use the config modulue
      envFilePath: !ENV ? '.env' : `.env.${ENV}`, 
      load: [appConfig, databaseConfig],
      validationSchema: environmentValidation
    }),

    // configure database connection
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        //entities: [User],
        synchronize: configService.get('database.synchronize'),
        port: +configService.get('database.port'), 
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        host: configService.get('database.host'),
        autoLoadEntities: configService.get('database.autoLoadEntities'),
        database: configService.get('database.name'),
    
     })
    }),

    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),

    TagsModule,

    MetaOptionsModule,

    PaginationModule,
  ],

  controllers: [AppController],

  providers: [
    AppService,
    {
      provide: APP_GUARD, //  the entire application  now is protected by this guard
      useClass: AuthenticationGuard // default guard
    },
    /* AuthorizationGuard has dependecy on AccessTokenGuard so we have to provıde it ın providers as well */
    {
      /* data reponse interceptor is applied globally to our application */
      provide: APP_INTERCEPTOR,
      useClass: DataResponseInterceptor 
    },
    AccessTokenGuard
  ],
})
export class AppModule {} //
