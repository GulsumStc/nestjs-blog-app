import { Module} from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './providers/posts.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { MetaOptionsModule } from 'src/meta-options/meta-options.module';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { TagsModule } from 'src/tags/tags.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { CreatePostProvider } from './providers/create-post.provider';


@Module({
  controllers: [PostsController],
  providers: [PostsService, CreatePostProvider],
  imports: [
    UsersModule,// import the entire module not specific service, importing the entire module   would import the service itself - only providers exported from usermodule
    TagsModule,
    TypeOrmModule.forFeature([Post, MetaOption]),
    PaginationModule
  ], 
})
export class PostsModule {}
