// create-product.dto.ts
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsMongoId, Min } from 'class-validator';
import mongoose, { Types } from 'mongoose';
import { Category } from 'src/application/enums';
import { IsDecimal } from '../constraints/isdecimal.constraint';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(Category)
  category: Category;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @IsDecimal({ message: 'price is not a valid decimal number.' })
  price: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;

  @IsString()
  brand: string;

  @IsNotEmpty()
  seller: Types.ObjectId;

}