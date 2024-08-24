import { Injectable } from '@nestjs/common';
import { title } from 'process';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';

@Injectable()
export class PostsService {

  
  constructor(

    private readonly userService: UsersService,// it is a inter-module dependency 

    @InjectRepository(Post)
    private postRepository: Repository<Post>,

    @InjectRepository(MetaOption)
    private metaOptionRepository: Repository<MetaOption>

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


  /**
   * Creates a new blog post
   * 
   * @param createPostDto the post data to be created
   * @returns the created post
   */
  public async createPost(createPostDto: CreatePostDto): Promise<Post> {

    // if the meta option exists in the createPostDto
    // save it first so that the post can reference it
    const metaOption = createPostDto.metaOptions
      ? this.metaOptionRepository.create(createPostDto.metaOptions)
      : null;
    if (metaOption) {
      // await the promise so that the post can reference it
      await this.metaOptionRepository.save(metaOption);
    }

    // create the post
    const post = this.postRepository.create(createPostDto);

    // if the meta option exists, add it to the post
    if (metaOption) {
      post.metaOptions = metaOption;
    }

    // return the post to the user
    return await this.postRepository.save(post);

  }


}
