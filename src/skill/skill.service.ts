import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Skill } from '../schemas/skill.schema';
import mongoose from 'mongoose';
import { ResponseSkillInterface } from './interfaces/response-skill.interface';

@Injectable()
export class SkillService {
  constructor(
    @InjectModel(Skill.name)
    private skillModel: mongoose.Model<Skill>,
  ) {}

  async findAll(): Promise<ResponseSkillInterface> {
    const skills = await this.skillModel.find().exec();
    if (!skills.length) {
      throw new UnprocessableEntityException('Data Cannot be processed');
    } else {
      return {
        statusCode: HttpStatus.OK,
        message: skills,
        error: '',
      };
    }
  }
}
