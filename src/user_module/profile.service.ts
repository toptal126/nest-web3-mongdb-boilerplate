import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateProfileDto } from './dto/profile.dto';
import { Profile, ProfileDocument } from './schema/profile.schema';
import Web3 from 'web3';
import { HTTP_RPC_URL } from 'src/helpers/constants';
@Injectable()
export class ProfileService {
  private web3: Web3;
  constructor(
    @InjectModel(Profile.name)
    private readonly profileModel: Model<ProfileDocument>,
  ) {
    this.web3 = new Web3(new Web3.providers.HttpProvider(HTTP_RPC_URL));
  }

  async testFunction() {}

  async create(createProfileDto: UpdateProfileDto): Promise<Profile> {
    if (!createProfileDto.wallet.length) return;

    return await this.profileModel
      .findOneAndUpdate({ wallet: createProfileDto.wallet }, createProfileDto, {
        returnDocument: 'after',
        upsert: true,
      })
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

  verifySignatureHash(
    data: string,
    owner: string,
    signatureHash: string,
  ): boolean {
    try {
      const recovered = this.web3.eth.accounts.recover(data, signatureHash);
      return owner.toLowerCase() === recovered.toLowerCase();
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  recoverSignatureHash(data: string, signatureHash: string): string {
    try {
      const recovered = this.web3.eth.accounts.recover(data, signatureHash);
      return recovered.toLowerCase();
    } catch (error) {
      return '';
    }
  }
}
