import { AuthEntity } from "src/domain/entities/auth.entity";
import { User } from "src/domain/schemas/user.schema";
import { UserDto } from "../dto/user.dto";

export interface AuthService {
  // generateToken(user: User): Promise<AuthEntity>;
  login(user: UserDto): Promise<AuthEntity>;
}