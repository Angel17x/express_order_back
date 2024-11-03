import { 
  ArrayMinSize, 
  IsArray, 
  IsDate, 
  IsMongoId, 
  IsNotEmpty, 
  IsNumber, 
  IsOptional, 
  IsString 
} from "class-validator";
import { PaymentStatus } from "../enums/payment-status";
import { Transform } from "class-transformer";

export class CreateSalesDto {
  
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  user: string;

  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  ecommerce:string;

  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber({}, { message: 'Price must be a valid number.' })
  totalAmount: number;

  @IsArray()
  @ArrayMinSize(1)
  productsId: string[];

  @IsNotEmpty()
  @IsString()
  bank: string;

  @IsNotEmpty()
  @IsString()
  reference: string;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  paymentStatus?: PaymentStatus = PaymentStatus.PENDING;
  
  @IsDate()
  @IsOptional()
  createdAt?: Date;
  
  @IsDate()
  @IsOptional()
  modifiedAt?: Date;
  
}