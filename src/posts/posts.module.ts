import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './providers/posts.service';
import { UsersModule } from 'src/users/users.module';


@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [UsersModule], // import the entire module not specific service, importing the entire module would import the service itself - only providers exported from usermodule
})
export class PostsModule {}
