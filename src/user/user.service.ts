import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import * as mongoose from 'mongoose';
import { UserInterface } from './interfaces/user.interface';
import { ResponseUserInterface } from './interfaces/response-user.interface';
import { matching } from 'utils/bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ResponseUserInterface> {
    await this.userModel.create({ ...createUserDto, token: '' });
    return {
      message: 'create success',
      statusCode: HttpStatus.OK,
    };
  }

  async findAll(): Promise<UserInterface[]> {
    const users = await this.userModel.find().exec();

    if (!users.length) {
      throw new UnprocessableEntityException('Data cannot be processed');
    }
    return users;
  }

  async findOne(id: string): Promise<UserInterface> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new UnprocessableEntityException('Data cannot be processed');
    } else {
      return user;
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<ResponseUserInterface> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new UnprocessableEntityException('Data cannot be processed');
    }
    // check if password has been changed
    const isMatch = await matching(updateUserDto.password, user.password);

    if (!isMatch) {
      updateUserDto.token = '';
    }

    await this.userModel.findByIdAndUpdate(id, updateUserDto).exec();

    return {
      message: 'update success',
      statusCode: 200,
    };
  }

  async remove(id: string): Promise<ResponseUserInterface> {
    try {
      await this.userModel.findByIdAndDelete(id).exec();
      return {
        message: 'delete success',
        statusCode: 200,
      };
    } catch (error) {
      throw new UnprocessableEntityException('Data cannot be processed');
    }
  }
}
