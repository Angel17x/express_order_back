import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { UsersModule } from './users.module';
import { DatabaseModule } from './database.module';
import { ConfigurationModule } from './config.module';
import { LoggerMiddleware } from '../middlewares/logger.middleware';
import { ProductsModule } from './products.module';
import { AuthModule } from './auth.module';
import { SalesModule } from './sales.module';

@Module({
  imports: 
  [ 
    ConfigurationModule, 
    DatabaseModule, 
    UsersModule, 
    ProductsModule, 
    AuthModule, SalesModule 
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
   .apply(LoggerMiddleware)
   .forRoutes("*");
  }
} 
