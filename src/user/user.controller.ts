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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUserInterface } from './interfaces/response-user.interface';
import { UserInterface } from './interfaces/user.interface';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Post('user')
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseUserInterface> {
    return this.userService.create(createUserDto);
  }

  @Get('users')
  async findAll(): Promise<UserInterface[]> {
    return this.userService.findAll();
  }

  @Get('user/:id')
  async findOne(@Param('id') id: string): Promise<UserInterface> {
    return this.userService.findOne(id);
  }

  @Patch('user/:id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseUserInterface> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('user/:id')
  async remove(@Param('id') id: string): Promise<ResponseUserInterface> {
    return this.userService.remove(id);
  }
}
