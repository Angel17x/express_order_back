// create-product.dto.ts
import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, Max, Min, ValidateNested } from 'class-validator';
import { Category } from 'src/application/enums';
import { IWeight } from 'src/domain/entities/weight.entity';
import { Type } from '../enums/types.enum';

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
  @Transform(({ value }) => parseFloat(value))
  @IsNumber({}, { message: 'Price must be a valid number.' })
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  stock?: number;

  @IsString()
  brand: string;

  @IsNotEmpty()
  seller: string;

  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value))
  @Max(5)
  @Min(0)
  @IsNumber({}, { message: 'rating must be a valid number.' })
  rating:number;

  @IsNotEmpty()
  @IsEnum(Type)
  type: Type;

  @IsNotEmpty()
  weight: number;
  
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date;
  
  @IsDate()
  @IsOptional()
  modifiedAt?: Date;

}