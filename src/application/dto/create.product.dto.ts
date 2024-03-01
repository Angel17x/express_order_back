// create-product.dto.ts
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsMongoId, Min } from 'class-validator';
import mongoose from 'mongoose';
import { CategoryEnum } from 'src/application/enums/type-product.enum';
import { IsDecimal } from '../constraints/isdecimal.constraint';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(CategoryEnum)
  category: CategoryEnum;

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
  @IsMongoId()
  seller: mongoose.Schema.Types.ObjectId;
}