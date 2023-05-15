import { Controller, Get } from '@nestjs/common';
import { SkillService } from './skill.service';
import { ResponseSkillInterface } from './interfaces/response-skill.interface';
@Controller('skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Get()
  async findAll(): Promise<ResponseSkillInterface> {
    return this.skillService.findAll();
  }
}
