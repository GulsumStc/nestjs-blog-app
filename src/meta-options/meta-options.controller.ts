import { Body, Controller, Post } from '@nestjs/common';
import { CreatePostMetaOptionDto } from './dtos/create-post-meta-option.dto';
import { MetaOptionsService } from './providers/meta-options.service';

@Controller('meta-options')
export class MetaOptionsController {

  constructor(
    private readonly metaOptionsService: MetaOptionsService
  ) { }

  //! http://localhost:3000/meta-options
  @Post()
  create(@Body() createMetaOptionDto: CreatePostMetaOptionDto) {
    return this.metaOptionsService.createMetaOptions(createMetaOptionDto);
  }


  
}
