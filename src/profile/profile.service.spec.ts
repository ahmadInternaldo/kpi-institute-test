import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from './profile.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileSchema } from '../schemas/profile.schema';
import { ProfileController } from './profile.controller';
import { ConfigModule } from '@nestjs/config';

describe('ProfileService', () => {
  let service: ProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env',
        }),
        MongooseModule.forRoot(process.env.DB_URI),
        MongooseModule.forFeature([
          {
            name: 'Profile',
            schema: ProfileSchema,
          },
        ]),
      ],
      controllers: [ProfileController],
      providers: [ProfileService],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
