// create-product.dto.ts
import { IsNotEmpty, IsMongoId } from 'class-validator';
import mongoose from 'mongoose';

export class ProductsWithEcommerceDto {
  
  @IsNotEmpty({ message: 'seller id is empty in query' })
  @IsMongoId({ message: 'seller id is not valid in query' })
  seller: mongoose.Schema.Types.ObjectId;

  constructor(seller) {
    this.seller = seller;
  }
}