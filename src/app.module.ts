import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
// import { TodoSchema } from './todo/schemas/todo.schema';
// import { PresaleInfoSchema } from './presale/schema/presaleInfo.schema';
// import { PartnerSchema } from './presale/schema/partner.schema';
// import { PairSchema } from './pair/schemas/pair.schema';
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(`${MONGODB_URI}/testDB?authSource=admin`, {
      connectionName: 'testDB',
    }),
    MongooseModule.forRoot(`${MONGODB_URI}/uniswap_v2_pairs?authSource=admin`, {
      connectionName: 'uniswap_v2_pairs',
    }),
    MongooseModule.forRoot(
      `${MONGODB_URI}/native_coin_history?authSource=admin`,
      {
        connectionName: 'native_coin_history',
      },
    ),
    MongooseModule.forRoot(`${MONGODB_URI}/meta_tx_logs?authSource=admin`, {
      connectionName: 'meta_tx_logs',
    }),
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
