import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema';
import { ProfileSchema } from 'src/schemas/profile.schema';
import { SkillSchema } from 'src/schemas/skill.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Profile', schema: ProfileSchema },
      { name: 'Skill', schema: SkillSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
