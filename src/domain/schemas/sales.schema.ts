import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { PaymentStatus } from 'src/application/enums/payment-status';
export type UserDocument = Document & Sales;


@Schema()
export class Sales {
  @Prop()
  _id: mongoose.Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: mongoose.Types.ObjectId;

  // @Prop()
  // ecommerceId: mongoose.Types.ObjectId;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
  productsId: mongoose.Types.ObjectId[]

  @Prop()
  bank:string;

  @Prop()
  reference: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  paymentStatus: PaymentStatus;
}

export const SalesSchema = SchemaFactory.createForClass(Sales);