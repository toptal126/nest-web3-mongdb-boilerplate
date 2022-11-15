import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { UpdateProfileDto } from './dto/profile.dto';
import { Profile, ProfileDocument } from './schema/profile.schema';
import { v4 as uuidv4 } from 'uuid';

require('dotenv').config();
const COVALENT_KEY = process.env.COVALENT_KEY;

@Injectable()
export class ProfileService {
  private web3;
  constructor(
    @InjectModel(Profile.name)
    private readonly profileModel: Model<ProfileDocument>,
  ) {
    // this.web3 = new Web3(new Web3.providers.HttpProvider(HTTP_RPC_URL));
  }

  async testFunction() {}

  async create(createProfileDto: UpdateProfileDto): Promise<Profile> {
    if (!(createProfileDto.profileId > 0)) return;

    return await this.profileModel
      .findOneAndUpdate(
        { profileId: createProfileDto.profileId },
        createProfileDto,
        {
          returnDocument: 'after',
          upsert: true,
        },
      )
      .exec();
  }

  async findAll(): Promise<Profile[]> {
    const all = await this.profileModel
      .find()
      .select({
        downloadLink: 0,
      })
      .exec();
    return all;
  }

  // verifySignatureHash(
  //   data: string,
  //   owner: string,
  //   signatureHash: string,
  // ): boolean {
  //   try {
  //     const recovered = this.web3.eth.accounts.recover(data, signatureHash);
  //     return owner.toLowerCase() === recovered.toLowerCase();
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // }
  // recoverSignatureHash(data: string, signatureHash: string): string {
  //   try {
  //     const recovered = this.web3.eth.accounts.recover(data, signatureHash);
  //     return recovered.toLowerCase();
  //   } catch (error) {
  //     return '';
  //   }
  // }
}
