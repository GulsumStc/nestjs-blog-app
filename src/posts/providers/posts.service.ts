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
    private readonly paginationProvider: PaginationProvider

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
