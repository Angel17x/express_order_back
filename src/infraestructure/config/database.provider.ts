import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule, ConfigService } from '@nestjs/config';
import schemas from 'src/domain/schemas/schemas';

export const databaseProviders = [
  MongooseModule.forFeature([...schemas]),
  MongooseModule.forRootAsync(
    {
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const mongoUri = configService.get<string>('MONGO_URI');
        if (!mongoUri) {
          throw new Error('MONGO_URI is not defined in the configuration');
        }
        return { uri: mongoUri }; 
      },
      inject: [ConfigService],
    }
  ),
];