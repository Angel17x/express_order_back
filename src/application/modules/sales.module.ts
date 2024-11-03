import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { DatabaseModule } from './database.module';
import { SalesController } from '../controllers/sales.controller';
import { JwtServiceImpl } from '../services/jwt.service.impl';
import { SalesServiceImpl } from '../services/sales.service.impl';
import { UserRepositoryImpl } from 'src/infraestructure/repositories/user.repository.impl';
import { UserServiceImpl } from '../services';
import { SalesUseCase } from 'src/domain/usecases/sales.usecase';
import { SalesRepositoryImpl } from 'src/infraestructure/repositories/sales.repository.impl';
import { UserUseCase } from 'src/domain/usecases/user.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [SalesController],
  providers: [
    AuthMiddleware,
    JwtServiceImpl,
    SalesServiceImpl,
    SalesUseCase,
    SalesRepositoryImpl,
    UserRepositoryImpl,
    UserServiceImpl,
    UserUseCase
  ],
})
export class SalesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(SalesController);
  }
}
