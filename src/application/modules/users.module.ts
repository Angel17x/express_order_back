import { MiddlewareConsumer, Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { UsersController } from '../controllers/users.controller';
import { UserUseCase } from 'src/domain/usecases/user.usecase';
import { UserRepositoryImpl } from 'src/infraestructure/repositories/user.repository.impl';
import { AuthMiddleware } from '../middlewares';
import { JwtServiceImpl, UserServiceImpl } from '../services';
import { createRolesMiddleware } from '../middlewares';
import { Role } from '../enums/role.enum';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    UserUseCase, 
    UserRepositoryImpl, 
    UserServiceImpl, 
    AuthMiddleware, 
    JwtServiceImpl,
  ],
  exports: [] // 
})
export class UsersModule 
{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware, createRolesMiddleware([Role.ADMIN]).use)
      .forRoutes(UsersController);
  }
}
