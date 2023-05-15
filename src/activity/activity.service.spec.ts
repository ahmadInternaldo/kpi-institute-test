import { Test, TestingModule } from '@nestjs/testing';
import { ActivityService } from './activity.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivitySchema } from '../schemas/activity.schema';
import { ActivityController } from './activity.controller';
import { ConfigModule } from '@nestjs/config';

describe('ActivityService', () => {
  let service: ActivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env',
        }),
        MongooseModule.forRoot(process.env.DB_URI),
        MongooseModule.forFeature([
          {
            name: 'Activity',
            schema: ActivitySchema,
          },
        ]),
      ],
      controllers: [ActivityController],
      providers: [ActivityService],
    }).compile();

    service = module.get<ActivityService>(ActivityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
