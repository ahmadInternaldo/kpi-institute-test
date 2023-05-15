import { Test, TestingModule } from '@nestjs/testing';
import { SkillService } from './skill.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SkillSchema } from '../schemas/skill.schema';
import { SkillController } from './skill.controller';
import { ConfigModule } from '@nestjs/config';

describe('SkillService', () => {
  let service: SkillService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env',
        }),
        MongooseModule.forRoot(process.env.DB_URI),
        MongooseModule.forFeature([
          {
            name: 'Skill',
            schema: SkillSchema,
          },
        ]),
      ],
      controllers: [SkillController],
      providers: [SkillService],
    }).compile();

    service = module.get<SkillService>(SkillService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
