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
    try {
      const activity = await this.activityModel
        .findOne(createActivityDto)
        .exec();

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
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(id: string): Promise<ResponseActivityInterface> {
    const activities = await this.activityModel
      .find({
        _id: { $gte: id },
      })
      .exec();
    return {
      statusCode: HttpStatus.OK,
      message: activities,
      error: '',
    };
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
