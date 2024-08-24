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

  public async findAll(userId: string) {
    
    const user = this.userService.findOneById(userId);
    let posts = await this.postRepository.find({
    /**
     * Indicates what relations of entity should be loaded (simplified left join form).
     */
      relations: {
        metaOptions: true //  to get the meta options with the post
      }
    });

    return posts;
    
  }


  /**
   * Creates a new blog post
   * 
   * @param createPostDto the post data to be created
   * @returns the created post
   */
  public async createPost(createPostDto: CreatePostDto): Promise<Post> {

    // because of cascade  true, the meta options will be created automatically
    // create the post
    const post = this.postRepository.create(createPostDto);

    // return the post to the user
    return await this.postRepository.save(post);

  }


}
