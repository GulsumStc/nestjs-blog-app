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

const ENV = process.env.NODE_ENV;
console.log(ENV);

@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, //makes it available to all modules or you would have to import it every other module that you create and when ever you want to use the config modulue
      envFilePath: ['.env.development']
      // envFilePath: !ENV  ? '.env' : `.env.${ENV}`, //
    }),

    /**
     * @module TypeOrmModule
     * 
     * Configures the PostgreSQL database connection.
     * 
     * **Synchronous Configuration:**
     * - Use `TypeOrmModule.forRoot()` to provide configuration directly.
     * - Suitable for simple and static configurations.
     * - Example usage:
     *   TypeOrmModule.forRoot({
     *     type: 'postgres',
     *     host: 'localhost',
     *   })
     * 
     * **Asynchronous Configuration:**
     * - Use `TypeOrmModule.forRootAsync()` to provide configuration dynamically and asynchronously.
     * - Supports configuration from environment variables and other dynamic sources.
     * - Asynchronous configuration is provided using `useFactory`.
     * - Example usage:
     *   TypeOrmModule.forRootAsync({
     *     useFactory: async () => ({
     *       type: 'postgres',
     *       host: process.env.DB_HOST || 'localhost',
     *     }),
     *   })
     */
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      entities: [User, Post],
      autoLoadEntities: true,
      synchronize: true,
      host: configService.get('DATABASE_HOST'),
      port: configService.get('DATABASE_PORT'),
      username: configService.get('DATABASE_USER'),
      password: configService.get('DATABASE_PASSWORD'),
      database: configService.get('DATABASE_NAME'),
    
     })
    }),

    TagsModule,

    MetaOptionsModule,

    MetaOptionsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} //
