import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, Document } from 'mongoose';
import { PaymentStatus } from 'src/application/enums/payment-status';
export type UserDocument = Document & Sales;


@Schema()
export class Sales {
  @Prop()
  _id: mongoose.Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  ecommerce: mongoose.Types.ObjectId;
  
  @Prop()
  totalAmount: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
  productsId: mongoose.Types.ObjectId[]

  @Prop()
  bank:string;

  @Prop()
  reference: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  modifiedAt: Date;

  @Prop()
  paymentStatus: PaymentStatus;

  

  
}

export const SalesSchema = SchemaFactory.createForClass(Sales);