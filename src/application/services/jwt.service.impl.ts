import { Injectable } from "@nestjs/common";
import { sign, verify } from 'jsonwebtoken';
import { JwtService } from "./jwt.service";
import { User } from "src/domain/schemas/user.schema";
import { AuthEntity } from "src/domain/entities/auth.entity";

@Injectable()
export class JwtServiceImpl implements JwtService {
  async verify(token: string): Promise<any> {
    const secret = process.env.JWT_SECRET;
    return verify(token, secret);
  }

  async sign(payload: User): Promise<AuthEntity> {
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN;
    return { token: sign({ ...payload }, secret, { expiresIn }) };
  }
} 