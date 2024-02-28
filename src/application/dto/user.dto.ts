import { IsEmail, IsString, Matches, MinLength, IsEnum } from "class-validator";
import { Role } from "../enums/role.enum";

export class UserDto {
  @IsString()
  @MinLength(2) 
  name: string;

  @IsString()
  @MinLength(2) 
  lastname: string;
  
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.#@$&*])[A-Za-z\d.#@$&*]{8,}$/)
  password: string;

  @IsString()
  address: string;

  @IsString()
  @IsEnum(Role)
  role: Role;
}