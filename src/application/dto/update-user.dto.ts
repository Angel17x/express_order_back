import { IsEmail, IsString, Matches, MinLength, IsEnum, IsOptional, IsArray, ValidateNested } from "class-validator";
import { Role } from "../enums/role.enum";
import { ISocial } from "src/domain/entities/social.entity";
import { Type } from "class-transformer";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(2) 
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(2) 
  lastname?: string;
  
  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  @Matches(/^(V|J|G|E|C)\d{4,11}$/)
  identity?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.#@$&*])[A-Za-z\d.#@$&*]{8,}$/)
  password?: string;
  
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  social?: ISocial[];
}