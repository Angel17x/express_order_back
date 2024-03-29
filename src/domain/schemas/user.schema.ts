// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/application/enums/role.enum';


export type UserDocument = Document & User;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  lastname: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  address: string;

  @Prop({ type: String, enum: Role, default: Role.CLIENT })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);