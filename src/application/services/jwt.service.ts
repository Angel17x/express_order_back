import { AuthEntity } from "src/domain/entities/auth.entity";
import { User } from "src/domain/schemas/user.schema";

export interface JwtService {
  sign(user: User): Promise<AuthEntity>;
  verify(token: string): Promise<any>;
}