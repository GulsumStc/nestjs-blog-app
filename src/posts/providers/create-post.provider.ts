import { BadRequestException, Body, ConflictException, Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Post } from '../post.entity';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TagsService } from 'src/tags/providers/tags.service';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { error } from 'console';

@Injectable()
export class CreatePostProvider {

  constructor(
    private readonly userService: UsersService,

    private readonly tagsService: TagsService,

    @InjectRepository(Post)
    private postsRepository: Repository<Post>,

  ) { }

  public async createPost(createPostDto: CreatePostDto, user: ActiveUserData): Promise<Post> {

    let author = undefined;
    let tags = undefined;

    // Find author from database based on user id.
    author = await this.userService.findOneById(user.sub).catch(() => {
      throw new ConflictException('The user does not exist', {
        cause: error,
      });
    });


    try {
    // finds tags
       tags = await this.tagsService.findMultipleTags(createPostDto.tags);
    } catch (error) {
      throw new ConflictException(error);
    }

    if(createPostDto.tags.length !== tags.length) {
      throw new BadRequestException("Please check your tags id");
    }

    // create the post
    const post = this.postsRepository.create({
      ...createPostDto,
      author: author,
      tags: tags
    });



    try {
      // return the post to the user
      return await this.postsRepository.save(post);
    } catch (error) {
      throw new ConflictException(error, {
        description: 'ensure post slug is unique and not a duplicate',
      })
    }

  }


}
