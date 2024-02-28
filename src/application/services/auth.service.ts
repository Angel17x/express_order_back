import { AuthEntity } from "src/domain/entities/auth.entity";
import { User } from "src/domain/schemas/user.schema";

export interface AuthService {
  generateToken(user: User): Promise<AuthEntity>;
}