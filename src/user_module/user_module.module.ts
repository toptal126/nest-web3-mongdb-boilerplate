import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CROSSWISE_NETWORK } from 'src/helpers/constants';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { Profile, ProfileSchema } from './schema/profile.schema';

@Module({
  providers: [ProfileService],
  controllers: [ProfileController],
  imports: [
    MongooseModule.forFeature(
      [{ name: Profile.name, schema: ProfileSchema }],
      CROSSWISE_NETWORK.name,
    ),
  ],
})
export class UserModule {}
