// product.schema.ts
import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Category } from 'src/application/enums';
import { IWeight } from '../entities/weight.entity';

export type ProductDocument = Document & Product;

@Schema()
export class Product {

  @Prop()
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ type: Object, required: true })
  weight: IWeight;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  modifiedAt: Date;

  @Prop({ required: true, enum: Object.values(Category) })
  category: Category;

  @Prop()
  description: string;

  @Prop({ required: true, min: 1, max: 5 })
  rating?: number;

  @Prop({ required: true })
  price: number;

  @Prop()
  stock: number;

  @Prop()
  brand: string;

  @Prop()
  imageUrl: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  seller: mongoose.Schema.Types.ObjectId;

}

export const ProductSchema = SchemaFactory.createForClass(Product);