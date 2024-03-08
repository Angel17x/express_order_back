import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { UsersController } from '../controllers/users.controller';
import { UserUseCase } from 'src/domain/usecases/user.usecase';
import { UserRepositoryImpl } from 'src/infraestructure/repositories/user.repository.impl';
import { UserServiceImpl } from '../services/users.service.impl';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { JwtServiceImpl } from '../services/jwt.service.impl';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    UserUseCase, 
    UserRepositoryImpl, 
    UserServiceImpl, 
    AuthMiddleware, 
    JwtServiceImpl
  ],
  exports: [] // 
})
export class UsersModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(AuthMiddleware)
    //   .forRoutes(UsersController);
  }
}
