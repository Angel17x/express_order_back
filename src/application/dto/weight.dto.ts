import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from "src/application/enums/types.enum";

export class Weight {
  @IsEnum(Type, { message: 'Type must be a valid enum value' })
  type: Type;

  @IsNotEmpty()
  @IsNumber()
  weight: number;
}