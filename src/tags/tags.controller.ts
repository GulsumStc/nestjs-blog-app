import { Body, Controller, Delete, ParseIntPipe, Post, Query } from '@nestjs/common';
import { TagsService } from './providers/tags.service';
import { CreateTagDto } from './dtos/create-tag.dto';

@Controller('tags')
export class TagsController {

  constructor(
    private readonly tagsService: TagsService
  ) {}


  //! http://localhost:8000/tags

  @Post()
  public createTag(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }


  //! http://localhost:8000/tags?id=1

  @Delete()
  public deleteTag(@Query('id', ParseIntPipe) id: number) {
    return this.tagsService.delete(id);
  }
  
  //! localhost:8000/tags/soft-delete?id=1

  @Delete('soft-delete')
  public softDelete(@Query('id', ParseIntPipe) id: number) {
    // return this.tagsService.delete(id);

    return this.tagsService.softDelete(id);
  }


}

