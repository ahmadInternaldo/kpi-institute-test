import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { ResponseSkillInterface } from './interfaces/response-skill.interface';

@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Post()
  async create(
    @Body() createSkillDto: CreateSkillDto,
  ): Promise<ResponseSkillInterface> {
    return this.skillService.create(createSkillDto);
  }

  @Get()
  async findAll(): Promise<ResponseSkillInterface> {
    return this.skillService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseSkillInterface> {
    return this.skillService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSkillDto: UpdateSkillDto,
  ): Promise<ResponseSkillInterface> {
    return this.skillService.update(id, updateSkillDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ResponseSkillInterface> {
    return this.skillService.remove(id);
  }
}
