import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProductsController } from '../controllers/product.controller';
import { ProductUseCase } from 'src/domain/usecases/product.usecase';
import { ProductRepositoryImpl } from 'src/infraestructure/repositories/product.repository.impl';
import { ProductServiceImpl } from '../services/product.service.impl';
import { DatabaseModule } from './database.module';
import { UsersModule } from './users.module';
import { UserRepositoryImpl } from 'src/infraestructure/repositories/user.repository.impl';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { JwtServiceImpl } from '../services/jwt.service.impl';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [ ProductsController ],
  providers: [
    ProductUseCase,
    ProductRepositoryImpl,
    UserRepositoryImpl,
    ProductServiceImpl,
    AuthMiddleware,
    JwtServiceImpl
  ],
})
export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .forRoutes(ProductsController);
  }
}
