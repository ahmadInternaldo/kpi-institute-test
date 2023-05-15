import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { LoginDto } from './dto/login.dto';
import { ResponseLoginInterface } from './interfaces/response-login.interface';
import { matching } from '../utils/bcrypt';
import { LogoutDto } from './dto/logout.dto';
import { ResponseLogoutInterface } from './interfaces/response-logout.interface';
import { User } from '../schemas/user.schema';
import { Blacklist } from 'src/schemas/blacklist.schema';
import * as jwtService from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userSchema: mongoose.Model<User>,

    @InjectModel(Blacklist.name)
    private blacklistSchema: mongoose.Model<Blacklist>,
  ) {}

  async login(loginDto: LoginDto): Promise<ResponseLoginInterface> {
    const user = await this.userSchema
      .findOne({
        username: loginDto.username,
      })
      .populate('profile')
      .exec();

    // user not found
    if (!user) {
      throw new UnauthorizedException('invalid login');
    }

    // matching password
    const isMatch = await matching(loginDto.password, user.password);
    // password not match
    if (!isMatch) {
      throw new UnauthorizedException('invalid login');
    }

    // generate token
    const token = jwtService.sign(
      {
        username: user.username,
        email: user.email,
        name: user.name,
        profile_name: user.profile.profile_name,
      },
      process.env.SECRET_KEY,
    );

    /**
     * register token to Blacklist Schema
     */
    await this.blacklistSchema.create({ token, status: false });

    return {
      token,
      profile: user.profile,
    };
  }

  async logout(query: LogoutDto): Promise<ResponseLogoutInterface> {
    await this.blacklistSchema
      .findOneAndUpdate({ token: query.token }, { status: true })
      .exec();
    return {
      message: 'logout success',
    };
  }
}
