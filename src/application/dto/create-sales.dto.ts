import { 
  ArrayMinSize, 
  IsArray, 
  IsMongoId, 
  IsNotEmpty, 
  IsNumber, 
  IsString 
} from "class-validator";
import { PaymentStatus } from "../enums/payment-status";

export class CreateSalesDto {
  
  @IsNotEmpty()
  @IsString()
  userid: string;

  @IsNotEmpty()
  @IsMongoId()
  ecommerceId: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsMongoId({ each: true })
  productsId: string[];

  @IsNotEmpty()
  @IsString()
  bank: string;

  @IsNotEmpty()
  @IsString()
  reference: string;

  @IsNotEmpty()
  @IsNumber()
  paymentStatus: PaymentStatus = PaymentStatus.PENDING;
  
}