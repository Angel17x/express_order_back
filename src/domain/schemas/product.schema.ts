// product.schema.ts
import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CategoryEnum } from 'src/application/enums/type-product.enum';

export type ProductDocument = Document & Product;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: Object.values(CategoryEnum) })
  category: CategoryEnum;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  imageUrl: string;

  @Prop()
  stock: number;

  @Prop()
  brand: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  seller: mongoose.Schema.Types.ObjectId;

}

export const ProductSchema = SchemaFactory.createForClass(Product);