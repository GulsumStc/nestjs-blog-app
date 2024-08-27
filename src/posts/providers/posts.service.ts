import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { title } from 'process';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JoinColumn, Repository } from 'typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { TagsService } from 'src/tags/providers/tags.service';

@Injectable()
export class PostsService {

  
  constructor(

    private readonly userService: UsersService,// it is a inter-module dependency 

    @InjectRepository(Post)
    private postsRepository: Repository<Post>,

    @InjectRepository(MetaOption)
    private metaOptionsRepository: Repository<MetaOption>,

    @Inject(TagsService)
    private tagsService: TagsService

  ) { } 

  public async findAll(userId: string) {
    
    let posts = await this.postsRepository.find({
  
      relations: { //Indicates what relations of entity should be loaded (simplified left join form).
        metaOptions: true, //  to get the meta options with the post
        // author: true
        // tags: true // to get the tags with the post
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

    // Find author from database based on authorId. before authentication we do something like this
    let author = await this.userService.findOneById(createPostDto.authorId);

    // finds tags
    const tags = await this.tagsService.findMultipleTags(createPostDto.tags);

    // create the post
    const post = this.postsRepository.create({
      ...createPostDto,
      author: author,
      tags: tags // assign the author to the post
    });

    // return the post to the user
    return await this.postsRepository.save(post);

  }


  public async delete(id: number) {

    // delete the post
    await this.postsRepository.delete(id);
    // on delete cascade: the meta options will be deleted automatically 

    
    return {
      message: 'Post deleted successfully with metaoptions',
      postId: id,
    }
    
   
  }


}
