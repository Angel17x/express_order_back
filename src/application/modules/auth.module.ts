import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { DatabaseModule } from './database.module';
import { UserRepositoryImpl } from 'src/infraestructure/repositories/user.repository.impl';
import { AuthServiceImpl, JwtServiceImpl, AuthService } from '../services';
import { AuthUseCase } from 'src/domain/usecases/auth.usecase';
import { UploadUseCase } from 'src/domain/usecases/upload.usecase';
import { AuthMiddleware, createRolesMiddleware } from '../middlewares';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [
    UserRepositoryImpl,
    AuthServiceImpl,
    AuthUseCase,
    JwtServiceImpl,
    UploadUseCase,
    AuthMiddleware
  ],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .exclude('/login', '/register')
    .forRoutes(AuthController);
  }
}
