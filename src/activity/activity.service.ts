import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Activity } from '../schemas/activity.schema';
import * as mongoose from 'mongoose';
import { ResponseActivityInterface } from './interfaces/response-activity.interface';

@Injectable()
export class ActivityService {
  constructor(
    @InjectModel(Activity.name)
    private activityModel: mongoose.Model<Activity>,
  ) {}

  async create(
    createActivityDto: CreateActivityDto,
  ): Promise<ResponseActivityInterface> {
    const activity = await this.activityModel.findOne(createActivityDto).exec();

    if (activity) {
      throw new UnprocessableEntityException('Data Cannot be processed');
    } else {
      await this.activityModel.create(createActivityDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'create success',
        error: '',
      };
    }
  }

  async findAll(): Promise<ResponseActivityInterface> {
    const activities = await this.activityModel.find().exec();
    if (!activities.length) {
      throw new UnprocessableEntityException('Data Cannot be processed');
    } else {
      return {
        statusCode: HttpStatus.OK,
        message: activities,
        error: '',
      };
    }
  }

  async findOne(id: string): Promise<ResponseActivityInterface> {
    const activity = await this.activityModel.findById(id).exec();
    if (!activity) {
      throw new UnprocessableEntityException('Data Cannot be processed');
    } else {
      return {
        statusCode: HttpStatus.OK,
        message: activity,
        error: '',
      };
    }
  }

  async update(
    id: string,
    updateActivityDto: UpdateActivityDto,
  ): Promise<ResponseActivityInterface> {
    const activity = await this.activityModel.findOne(updateActivityDto).exec();

    if (activity && activity._id.toString() !== id) {
      throw new UnprocessableEntityException('Data Cannot be processed');
    } else {
      await this.activityModel.findByIdAndUpdate(id, updateActivityDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'update success',
        error: '',
      };
    }
  }

  async remove(id: string): Promise<ResponseActivityInterface> {
    try {
      await this.activityModel.findByIdAndDelete(id);
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
