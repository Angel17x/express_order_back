import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { DatabaseModule } from './database.module';
import { SalesController } from '../controllers/sales.controller';
import { JwtServiceImpl } from '../services/jwt.service.impl';

@Module({
  imports: [DatabaseModule],
  controllers: [SalesController],
  providers: [
    AuthMiddleware,
    JwtServiceImpl
  ],
})
export class SalesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(SalesController);
  }
}
