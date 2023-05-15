import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
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

  async create(
    createSkillDto: CreateSkillDto,
  ): Promise<ResponseSkillInterface> {
    const skill = await this.skillModel.findOne(createSkillDto).exec();

    if (skill) {
      throw new UnprocessableEntityException('Data Cannot be processed');
    } else {
      await this.skillModel.create(createSkillDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'create success',
        error: '',
      };
    }
  }

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

  async findOne(id: string): Promise<ResponseSkillInterface> {
    const skill = await this.skillModel.findById(id).exec();
    if (!skill) {
      throw new UnprocessableEntityException('Data Cannot be processed');
    } else {
      return {
        statusCode: HttpStatus.OK,
        message: skill,
        error: '',
      };
    }
  }

  async update(
    id: string,
    updateSkillDto: UpdateSkillDto,
  ): Promise<ResponseSkillInterface> {
    const skill = await this.skillModel.findOne(updateSkillDto).exec();

    if (skill && skill._id.toString() !== id) {
      throw new UnprocessableEntityException('Data Cannot be processed');
    } else {
      await this.skillModel.findByIdAndUpdate(id, updateSkillDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'update success',
        error: '',
      };
    }
  }

  async remove(id: string): Promise<ResponseSkillInterface> {
    try {
      await this.skillModel.findByIdAndDelete(id);
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
