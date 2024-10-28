import { AuthEntity } from "src/domain/entities/auth.entity";
import { User } from "src/domain/schemas/user.schema";
import { UserDto } from "../dto/user.dto";
import { LoginDto } from "../dto/login.dto";
import { UpdateUserDto } from "../dto/update-user.dto";

export interface AuthService {
  // generateToken(user: User): Promise<AuthEntity>;
  login(user: LoginDto): Promise<AuthEntity>;
  registerUser(user: UserDto, file: Express.Multer.File): Promise<User>;
  updateInfo(id:string, user: UpdateUserDto, file: Express.Multer.File): Promise<User>;
}