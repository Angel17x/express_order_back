import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserSchema } from 'src/domain/schemas/user.schema';

export const databaseProviders = [
  MongooseModule.forFeature([{name: 'User', schema: UserSchema }]),
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