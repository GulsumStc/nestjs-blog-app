import { Injectable } from '@nestjs/common';
import { title } from 'process';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {

  
  constructor(
    private readonly userService: UsersService,// it is a inter-module dependency 

    @InjectRepository(Post)
    private postRepository: Repository<Post>
  ) { } 

  public findAll(userId: string) {
    
    const user = this.userService.findOneById(userId);
    
    return [
      {
        user: user,
        title: 'My first post',
        content: 'This is my first post'
      },
      {
        user: user,
        title: 'My second post',
        content: 'This is my second post'
      }
    ]
    
  }


  public async createPost(createPostDto: CreatePostDto) {

    return 'This action adds a new post';
  }

}
