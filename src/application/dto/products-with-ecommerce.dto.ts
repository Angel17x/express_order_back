// create-product.dto.ts
import { IsNotEmpty, IsMongoId } from 'class-validator';
import mongoose from 'mongoose';

export class ProductsWithEcommerceDto {
  
  @IsNotEmpty()
  @IsMongoId()
  seller: mongoose.Schema.Types.ObjectId;

  constructor(seller) {
    this.seller = seller;
  }
}