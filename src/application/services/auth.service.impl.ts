import { Injectable } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtServiceImpl } from "./jwt.service.impl";
import { AuthEntity } from "src/domain/entities/auth.entity";
import { User } from "src/domain/schemas/user.schema";
import { LoginDto } from "../dto/login.dto";
import { AuthUseCase } from "src/domain/usecases/auth.usecase";

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    private readonly authUseCase: AuthUseCase,
    private readonly jwtService: JwtServiceImpl
  ) { }
  async login(user: LoginDto): Promise<AuthEntity> {
    const repoUser = await this.authUseCase.auth(user);
    return this.generateToken(repoUser);
  }

  private async generateToken(payload: User): Promise<AuthEntity> {
    const token = await this.jwtService.sign(payload);
    return token;
  }
}