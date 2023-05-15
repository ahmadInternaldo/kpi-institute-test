import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { ResponseActivityInterface } from './interfaces/response-activity.interface';
import { RoleEnum } from 'src/utils/role.enum';
import { Roles } from 'src/utils/roles.decorator';
import { RolesGuard } from 'src/utils/roles.guard';

@Controller()
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get('activities/:skill_id')
  async findAll(
    @Param('skill_id') id: string,
  ): Promise<ResponseActivityInterface> {
    return this.activityService.findAll(id);
  }

  @Roles(RoleEnum.EXPERT)
  @UseGuards(RolesGuard)
  @Post('activity')
  async create(
    @Body() createActivityDto: CreateActivityDto,
  ): Promise<ResponseActivityInterface> {
    return this.activityService.create(createActivityDto);
  }

  @Roles(RoleEnum.EXPERT)
  @UseGuards(RolesGuard)
  @Patch('activity/:id')
  async update(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ): Promise<ResponseActivityInterface> {
    return this.activityService.update(id, updateActivityDto);
  }

  @Roles(RoleEnum.EXPERT)
  @UseGuards(RolesGuard)
  @Delete('activity/:id')
  async remove(@Param('id') id: string): Promise<ResponseActivityInterface> {
    return this.activityService.remove(id);
  }
}
