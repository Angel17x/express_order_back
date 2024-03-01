import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { DatabaseModule } from './database.module';
import { SalesController } from '../controllers/sales.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [
    AuthMiddleware
  ],
})
export class SalesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(SalesController);
  }
}
