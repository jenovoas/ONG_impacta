import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SpeciesService } from './species.service';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @Post()
  @Roles('ADMIN')
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createSpeciesDto: CreateSpeciesDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.speciesService.create(createSpeciesDto, file);
  }

  @Get()
  findAll() {
    return this.speciesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.speciesService.findOne(id);
  }

  @Patch(':id')
  @Roles('ADMIN')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: string,
    @Body() updateDto: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.speciesService.update(id, updateDto, file);
  }
}
