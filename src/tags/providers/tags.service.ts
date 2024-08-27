import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../tag.entity';
import { In, Repository } from 'typeorm';
import { CreateTagDto } from '../dtos/create-tag.dto';

@Injectable()
export class TagsService {

  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) { }


  public async create(createTagDto:CreateTagDto ) {

    let tag = this.tagsRepository.create(createTagDto);
    return await this.tagsRepository.save(tag);

    
  }

  public async findMultipleTags(tags:number[]) {

    let results = await this.tagsRepository.find({
      where: {
        id: In(tags)
      }
    })

    return results;


  }

  public async delete(id: number) {

    // senario: when we delete a tag, The particular tag should end relationship with the posts


    await this.tagsRepository.delete(id);
    return {
      message: 'Tag deleted successfully',
      tagId: id
    }
    
  }

  public async softDelete(id: number) {

    await this.tagsRepository.softDelete(id);
    return {
      message: 'Tag deleted successfully',
      tagId: id
    }
    
  }

}
