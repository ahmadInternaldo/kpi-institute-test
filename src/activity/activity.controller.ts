import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { ResponseActivityInterface } from './interfaces/response-activity.interface';

@Controller()
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post('activity')
  async create(
    @Body() createActivityDto: CreateActivityDto,
  ): Promise<ResponseActivityInterface> {
    return this.activityService.create(createActivityDto);
  }

  @Get('activities')
  async findAll(): Promise<ResponseActivityInterface> {
    return this.activityService.findAll();
  }

  @Get('activity/:id')
  async findOne(@Param('id') id: string): Promise<ResponseActivityInterface> {
    return this.activityService.findOne(id);
  }

  @Patch('activity/:id')
  async update(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ): Promise<ResponseActivityInterface> {
    return this.activityService.update(id, updateActivityDto);
  }

  @Delete('activity/:id')
  async remove(@Param('id') id: string): Promise<ResponseActivityInterface> {
    return this.activityService.remove(id);
  }
}
