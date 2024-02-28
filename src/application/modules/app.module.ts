import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { UsersModule } from './users.module';
import { DatabaseModule } from './database.module';
import { ConfigurationModule } from './config.module';

@Module({
  imports: 
  [ 
    ConfigurationModule, 
    DatabaseModule, 
    UsersModule 
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
