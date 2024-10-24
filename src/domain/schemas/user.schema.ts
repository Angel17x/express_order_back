// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Role } from 'src/application/enums/role.enum';
import { ISocial } from '../entities/social.entity';


export type UserDocument = Document & User;

@Schema()
export class User {
  @Prop()
  _id: Types.ObjectId

  @Prop()
  name: string;

  @Prop()
  lastname: string;

  @Prop()
  address: string;

  @Prop({ unique: true })
  identity: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ type: String, /* enum: Role, default: Role.CLIENT*/ })
  role?: Role;

  @Prop({
    type: String
  })
  avatar?: String;

  @Prop({ type: Array<Object> })
  social?: ISocial[];

}

export const UserSchema = SchemaFactory.createForClass(User);