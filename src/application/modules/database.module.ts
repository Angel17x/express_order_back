// src/database/database.module.ts
import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { databaseProviders } from 'src/infraestructure/config/database.provider';

@Module({
  imports: [
    ...databaseProviders,
  ],
  exports: [
    ...databaseProviders,
    MongooseModule, // Export MongooseModule to make it available throughout your app
  ],
})
export class DatabaseModule {}