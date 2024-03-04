import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule, ConfigService } from '@nestjs/config';
import schemas from 'src/domain/schemas/schemas';
import { Logger } from '@nestjs/common';

export const databaseProviders = [
  MongooseModule.forFeature([...schemas]),
  MongooseModule.forRootAsync(
    {
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const mongoDbUri = configService.get<string>('MONGO_DB_URI');
        if (!mongoDbUri) throw new Error('MONGO_DB_URI is not defined in the configuration');

        const mongoUser = configService.get<string>('MONGO_USER');
        if (!mongoUser) throw new Error('MONGO_USER is not defined in the configuration');

        const mongoPassword = configService.get<string>('MONGO_PASSWORD');
        if (!mongoPassword) throw new Error('MONGO_PASSWORD is not defined in the configuration');

        const mongoHost = configService.get<string>('MONGO_HOST');
        if (!mongoHost) throw new Error('MONGO_HOST is not defined in the configuration');

        const mongoPort = configService.get<string>('MONGO_PORT');
        if (!mongoPort) throw new Error('MONGO_PORT is not defined in the configuration');

        const mongoDb = configService.get<string>('MONGO_DB');
        if (!mongoDb) throw new Error('MONGO_DB is not defined in the configuration');

        const mongoOptions = configService.get<string>('MONGO_OPTIONS') ?? '';
        
        const mongoUri = `${mongoDbUri}${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDb}${mongoOptions}`;
        return { uri: mongoUri };  
      },
      inject: [ConfigService],
    }
  ),
];