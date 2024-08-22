import { Injectable } from '@nestjs/common';
import { title } from 'process';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';

@Injectable()
export class PostsService {
  createPost(createPostDto: CreatePostDto) {
    throw new Error('Method not implemented.');
  }
  
  constructor(private readonly userService: UsersService){} // it is a inter-module dependency 

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


}
