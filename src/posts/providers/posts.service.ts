import { Injectable } from '@nestjs/common';
import { title } from 'process';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class PostsService {
  
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
