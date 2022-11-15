import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CROSSWISE_NETWORK } from './helpers/constants';
import { UserModule } from './user_module/user_module.module';
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

@Module({
  imports: [
    UserModule,
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(
      `${MONGODB_URI}/${CROSSWISE_NETWORK.name}?authSource=admin`,
      {
        connectionName: CROSSWISE_NETWORK.name,
      },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
