import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ResponseUserInterface } from './interfaces/response-user.interface';
import { User } from '../schemas/user.schema';
import { Profile } from 'src/schemas/profile.schema';
import { Skill } from 'src/schemas/skill.schema';
import { hash } from 'src/utils/bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userSchema: mongoose.Model<User>,

    @InjectModel(Profile.name)
    private profileSchema: mongoose.Model<Profile>,

    @InjectModel(Skill.name)
    private skillSchema: mongoose.Model<Skill>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ResponseUserInterface> {
    try {
      // validating username and email duplicate
      const validateUser = await this.userSchema
        .findOne()
        .or([
          { username: createUserDto.username },
          { email: createUserDto.email },
        ])
        .exec();
      if (validateUser) {
        throw new UnprocessableEntityException('Data Cannot be processed');
      }

      createUserDto.password = await hash(createUserDto.password);
      /**
       * for declaring profile database
       */

      let tempProfile,
        tempSkill = undefined;
      const profile = await this.profileSchema
        .findOne({ profile_name: createUserDto.profile.profile_name })
        .exec();

      if (!profile) {
        tempProfile = await this.profileSchema.create({
          ...createUserDto.profile,
          users: [],
        });
      } else {
        tempProfile = profile;
      }

      /**
       * for declaring skill database
       */
      const skill = await this.skillSchema
        .findOne({ skill_name: createUserDto.skill.skill_name })
        .exec();
      if (!skill) {
        tempSkill = await this.skillSchema.create({
          ...createUserDto.skill,
          users: [],
        });
      } else {
        tempSkill = skill;
      }

      const user = await this.userSchema.create({
        ...createUserDto,
        profile: tempProfile,
        skill: tempSkill,
      });

      /**
       * updating profile
       */
      if (tempProfile.users?.length) {
        tempProfile.users.push(user);
      } else {
        tempProfile['users'] = [];
        tempProfile.users.push(user);
      }
      await this.profileSchema
        .findByIdAndUpdate(tempProfile.id, {
          tempProfile,
        })
        .exec();

      /**
       * updating skilss
       */
      if (tempSkill.users?.length) {
        tempSkill.users.push(user);
      } else {
        tempSkill['users'] = [];
        tempSkill.users.push(user);
      }
      await this.profileSchema
        .findByIdAndUpdate(tempSkill.id, {
          tempSkill,
        })
        .exec();

      return {
        message: 'create success',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      console.log(error);
      throw new UnprocessableEntityException('Data Cannot be processed');
    }
  }
}
