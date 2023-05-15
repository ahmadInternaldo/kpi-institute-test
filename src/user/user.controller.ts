import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseUserInterface } from './interfaces/response-user.interface';
import { Roles } from 'src/utils/roles.decorator';
import { RoleEnum } from 'src/utils/role.enum';
import { RolesGuard } from 'src/utils/roles.guard';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(RoleEnum.BOARD)
  @UseGuards(RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Post('user')
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseUserInterface> {
    return this.userService.create(createUserDto);
  }
}
