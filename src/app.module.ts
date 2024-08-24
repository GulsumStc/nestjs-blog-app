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
import { MetaOptionModule } from './meta-option/meta-option.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';


@Module({
  imports: [UsersModule, PostsModule, AuthModule,

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
      imports: [],
      inject: [],
      useFactory: () => ({
      type: 'postgres',
      entities: [User, Post],
      synchronize: true,
      host: 'localhost',
      port: 5432,
      username: 'username',
      password: 'password',
      database: 'nestjs-blog-app',
     })
    }),

    TagsModule,

    MetaOptionModule,

    MetaOptionsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} //
