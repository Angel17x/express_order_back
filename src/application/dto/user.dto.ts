import { IsEmail, IsString, Matches, MinLength, IsEnum, IsOptional, IsArray, ValidateNested, ArrayMinSize } from "class-validator";
import { Role } from "../enums/role.enum";
import { ISocial } from "src/domain/entities/social.entity";

export class UserDto {
  @IsString()
  @MinLength(2) 
  name: string;

  @IsString()
  @MinLength(2) 
  lastname: string;
  
  @IsString()
  address: string;

  @IsString()
  @Matches(/^(V|J|G|E|C)\d{4,11}$/)
  identity: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.#@$&*])[A-Za-z\d.#@$&*]{8,}$/)
  password: string;

  @IsEnum(Role)
  role: Role;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  social?: ISocial[]
}