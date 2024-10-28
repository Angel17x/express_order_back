// create-product.dto.ts
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { Category } from 'src/application/enums';
import { Transform } from 'class-transformer';
import { Type } from '../enums/types.enum';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(Category)
  category?: Category;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber({}, { message: 'Price must be a valid number.' })
  @Min(0)
  price?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @Max(5)
  @Min(0)
  @IsNumber({}, { message: 'rating must be a valid number.' })
  rating?:number;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(Type)
  type?: Type;

  @IsOptional()
  @IsNotEmpty()
  weight?: number;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsNotEmpty()
  seller: string;
}