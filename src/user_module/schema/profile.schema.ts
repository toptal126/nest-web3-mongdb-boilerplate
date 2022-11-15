import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Document, Types } from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema()
export class Profile {
  @Prop({ required: true, unique: true })
  username: string;
  @Prop({ required: true })
  createdAt: Date;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
