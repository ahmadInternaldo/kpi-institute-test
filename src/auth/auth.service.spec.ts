import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema';
import { AuthController } from './auth.controller';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env',
        }),
        MongooseModule.forRoot(process.env.DB_URI),
        MongooseModule.forFeature([
          {
            name: 'User',
            schema: UserSchema,
          },
        ]),
      ],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
