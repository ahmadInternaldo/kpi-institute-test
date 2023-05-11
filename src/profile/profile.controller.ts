import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ResponseProfileInterface } from './interfaces/response-profile.interface';

@Controller()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @HttpCode(HttpStatus.OK)
  @Post('profile')
  async create(
    @Body() createProfileDto: CreateProfileDto,
  ): Promise<ResponseProfileInterface> {
    return this.profileService.create(createProfileDto);
  }

  @Get('profiles')
  async findAll(): Promise<ResponseProfileInterface> {
    return this.profileService.findAll();
  }

  @Get('profile/:id')
  async findOne(@Param('id') id: string): Promise<ResponseProfileInterface> {
    return this.profileService.findOne(id);
  }

  @Patch('profile/:id')
  async update(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<ResponseProfileInterface> {
    return this.profileService.update(id, updateProfileDto);
  }

  @Delete('profile/:id')
  async remove(@Param('id') id: string): Promise<ResponseProfileInterface> {
    return this.profileService.remove(id);
  }
}
