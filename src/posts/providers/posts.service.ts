import { Inject, Injectable, InternalServerErrorException, NotFoundException, Patch } from '@nestjs/common';
import { title } from 'process';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JoinColumn, Repository } from 'typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { GetPostsDto } from '../dtos/get-posts.dto';
import { privateDecrypt } from 'crypto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { CreatePostProvider } from './create-post.provider';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Injectable()
export class PostsService {


  constructor(

    private readonly userService: UsersService,// it is a inter-module dependency 

    @InjectRepository(Post)
    private postsRepository: Repository<Post>,

    @InjectRepository(MetaOption)
    private metaOptionsRepository: Repository<MetaOption>,

    @Inject(TagsService)
    private tagsService: TagsService,

    /* injecting paginationProvider */
    @Inject(PaginationProvider)
    private readonly paginationProvider: PaginationProvider,

    @Inject(CreatePostProvider)
    private readonly createPostProvider: CreatePostProvider

  ) { }
  public async findAll(postQuery: GetPostsDto, userId: string): Promise<Paginated<Post>> {

    
    let posts = await this.paginationProvider.paginateQuery(
      {
        limit: postQuery.limit,
        page: postQuery.page
      },
      this.postsRepository,
    );
  
    return posts;
  }
  



 
  /**
   * Creates a new post
   * @param createPostDto The data needed to create a new post
   * @param user The user who is creating the post
   * @returns The newly created post
   */
  public async createPost(createPostDto: CreatePostDto, user: ActiveUserData){
    // delegate the creation of a new post to the createPostProvider
    return await this.createPostProvider.createPost(createPostDto, user);
  }


  @Patch()
  public async updatePost(patchPostDto: PatchPostDto) {

    // find the tags
    const tags = await this.tagsService.findMultipleTags(patchPostDto.tags);

    // find the post
    const post = await this.postsRepository.findOne({
      where: {
        id: patchPostDto.id
      }
    });

    // update the properties of the post
    post.title = patchPostDto.title ?? post.title; // nullish coalescing operator
    post.content = patchPostDto.content ?? post.content;
    post.featuredImageUrl = patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
    post.publishOn = patchPostDto.publishOn ?? post.publishOn;
    post.status = patchPostDto.status ?? post.status;
    post.postType = patchPostDto.postType ?? post.postType;
    post.slug = patchPostDto.slug ?? post.slug;

    // assigned new tags
    post.tags = tags ?? post.tags;

    // save the post and return the updated post
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
