import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/schemas/user.schema';
import mongoose from 'mongoose';
import { LoginDto } from './dto/login.dto';
import { ResponseLoginInterface } from './interfaces/response-login.interface';
import { matching } from 'utils/bcrypt';
import { LogoutDto } from './dto/logout.dto';
import { ResponseLogoutInterface } from './interfaces/response-logout.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async login(loginDto: LoginDto): Promise<ResponseLoginInterface> {
    const user = await this.userModel
      .findOne({ username: loginDto.username })
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
    const token = '';

    return {
      token,
    };
  }

  async logout(query: LogoutDto): Promise<ResponseLogoutInterface> {
    await this.userModel
      .findOneAndUpdate({ token: query.token }, { token: '' })
      .exec();

    return {
      message: 'logout success',
    };
  }
}
