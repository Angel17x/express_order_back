import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule, ConfigService } from '@nestjs/config';
import schemas from 'src/domain/schemas/schemas';
import { Logger } from '@nestjs/common';
// import { mongo } from 'mongoose';

export const databaseProviders = [
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => {
      const server_env = configService.get<string>('SERVER_NODE_ENV');

      const mongoDbUri = configService.get<string>('MONGO_DB_URI');
      if (!mongoDbUri)
        throw new Error('MONGO_DB_URI is not defined in the configuration');

      const mongoUser = configService.get<string>('MONGO_USER');
      if (!mongoUser)
        throw new Error('MONGO_USER is not defined in the configuration');

      const mongoPassword = configService.get<string>('MONGO_PASSWORD');
      if (!mongoPassword && server_env !== 'localhost')
        throw new Error('MONGO_PASSWORD is not defined in the configuration');

      const mongoHost = configService.get<string>('MONGO_HOST');
      if (!mongoHost)
        throw new Error('MONGO_HOST is not defined in the configuration');

      const mongoPort = configService.get<string>('MONGO_PORT');
      if (server_env === 'local' && !mongoPort)
        throw new Error('MONGO_PORT is not defined in the configuration');

      const mongoDb = configService.get<string>('MONGO_DB');
      if (!mongoDb)
        throw new Error('MONGO_DB is not defined in the configuration');

      const mongoOptions = configService.get<string>('MONGO_OPTIONS') ?? '';

      let mongoUri = `${mongoDbUri}${mongoUser}:${mongoPassword}@${mongoHost}${mongoOptions}`;
      if (!server_env || server_env === 'local') {
        mongoUri = `${mongoDbUri}${mongoHost}:${mongoPort}${mongoOptions}`;
      }
      Logger.debug(mongoUri);
      return { uri: mongoUri, dbName: mongoDb };
    },
    inject: [ConfigService],
  }),
  MongooseModule.forFeature([...schemas]),
];
