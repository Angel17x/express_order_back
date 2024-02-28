import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8) // Asumiendo que deseas que la contraseña tenga un mínimo de 8 caracteres.
  password: string;
 
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
