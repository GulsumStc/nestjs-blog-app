import { Injectable } from '@nestjs/common';
import { CreatePostMetaOptionDto } from '../dtos/create-post-meta-option.dto';
import { Repository } from 'typeorm';
import { MetaOption } from '../meta-option.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MetaOptionsService {

  constructor(
    @InjectRepository(MetaOption)
    private readonly metaOptionRepository: Repository<MetaOption>,
  ) { }


  public async createMetaOptions(createMetaOptionsDto: CreatePostMetaOptionDto) {

    const newMetaOption = this.metaOptionRepository.create(createMetaOptionsDto);
    const savedMetaOption = await this.metaOptionRepository.save(newMetaOption);
    return savedMetaOption;

  }

}
