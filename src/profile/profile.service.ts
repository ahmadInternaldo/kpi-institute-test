import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from './schemas/profile.schema';
import * as mongoose from 'mongoose';
import { ResponseProfileInterface } from './interfaces/response-profile.interface';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name)
    private profileModel: mongoose.Model<Profile>,
  ) {}
  async create(
    createProfileDto: CreateProfileDto,
  ): Promise<ResponseProfileInterface> {
    const profile = await this.profileModel.findOne(createProfileDto).exec();

    if (profile) {
      throw new UnprocessableEntityException('Data Cannot be processed');
    } else {
      await this.profileModel.create(createProfileDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'create success',
        error: '',
      };
    }
  }

  async findAll(): Promise<ResponseProfileInterface> {
    const profiles = await this.profileModel.find().exec();
    if (!profiles.length) {
      throw new UnprocessableEntityException('Data Cannot be processed');
    } else {
      return {
        statusCode: HttpStatus.OK,
        message: profiles,
        error: '',
      };
    }
  }

  async findOne(id: string): Promise<ResponseProfileInterface> {
    const profile = await this.profileModel.findById(id).exec();
    if (!profile) {
      throw new UnprocessableEntityException('Data Cannot be processed');
    } else {
      return {
        statusCode: HttpStatus.OK,
        message: profile,
        error: '',
      };
    }
  }

  async update(
    id: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<ResponseProfileInterface> {
    const profile = await this.profileModel.findOne(updateProfileDto).exec();

    if (profile && profile._id.toString() !== id) {
      throw new UnprocessableEntityException('Data Cannot be processed');
    } else {
      await this.profileModel.findByIdAndUpdate(id, updateProfileDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'update success',
        error: '',
      };
    }
  }

  async remove(id: string): Promise<ResponseProfileInterface> {
    try {
      await this.profileModel.findByIdAndDelete(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'delete success',
        error: '',
      };
    } catch (error) {
      throw new UnprocessableEntityException('Data Cannot be processed');
    }
  }
}
