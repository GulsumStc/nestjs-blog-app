import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
    private postsRepository: Repository<Post>,

    @InjectRepository(MetaOption)
    private metaOptionsRepository: Repository<MetaOption>

  ) { } 

  public async findAll(userId: string) {
    
    const user = this.userService.findOneById(userId);
    let posts = await this.postsRepository.find({
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
    const post = this.postsRepository.create(createPostDto);

    // return the post to the user
    return await this.postsRepository.save(post);

  }


  public async delete(id: number) {

    // find the post
    let post = await this.postsRepository.findOneBy({ id });
    console.log(post);

    // delete the post
    await this.postsRepository.delete(id);

    // delete meta options
    await this.metaOptionsRepository.delete(post.metaOptions.id)
    
    return {
      message: 'Post deleted successfully'
    }
    
    
  }


}
