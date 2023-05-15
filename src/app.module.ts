import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { SkillModule } from './skill/skill.module';
import { ActivityModule } from './activity/activity.module';
import { Middleware } from './utils/middleware';
import { BlacklistSchema } from './schemas/blacklist.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    MongooseModule.forFeature([
      {
        name: 'Blacklist',
        schema: BlacklistSchema,
      },
    ]),
    UserModule,
    AuthModule,
    SkillModule,
    ActivityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Middleware)
      .exclude(
        {
          path: '/auth/login',
          method: RequestMethod.POST,
        },
        {
          path: '/',
          method: RequestMethod.GET,
        },
      )
      .forRoutes('*');
  }
}
