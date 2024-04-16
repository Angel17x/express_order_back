// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { RoleEnum } from 'src/application/enums/role.enum';


export type UserDocument = Document & User;

@Schema()
export class User {
  @Prop()
  _id: mongoose.Types.ObjectId

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

  @Prop({ type: String, /* enum: RoleEnum, default: RoleEnum.CLIENT*/ })
  role?: RoleEnum;
}

export const UserSchema = SchemaFactory.createForClass(User);