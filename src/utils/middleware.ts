import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwtService from 'jsonwebtoken';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Blacklist } from '../schemas/blacklist.schema';

@Injectable()
export class Middleware implements NestMiddleware {
  constructor(
    @InjectModel(Blacklist.name)
    private readonly blacklistSchema: Model<Blacklist>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      /** find Blacklist token */
      const blacklist = await this.blacklistSchema
        .findOne({ token: req.query.token, status: true })
        .exec();
      if (blacklist) {
        throw new UnauthorizedException();
      } else {
        req['user'] = jwtService.verify(
          String(req.query.token),
          process.env.SECRET_KEY,
        );
        next();
      }
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
