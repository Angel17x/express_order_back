import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { DatabaseModule } from './database.module';
import { UserRepositoryImpl } from 'src/infraestructure/repositories/user.repository.impl';
import { AuthServiceImpl, JwtServiceImpl, AuthService } from '../services';
import { AuthUseCase } from 'src/domain/usecases/auth.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [
    UserRepositoryImpl,
    AuthServiceImpl,
    AuthUseCase,
    JwtServiceImpl
  ],
})
export class AuthModule {}
