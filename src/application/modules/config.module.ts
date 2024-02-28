import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env${process.env.NODE_ENV ? '.' + process.env.NODE_ENV : ''}`, // Fallback to `.env` if NODE_ENV is not set
      ignoreEnvFile: process.env.NODE_ENV === 'production', // Ignore .env file in production
    }),
  ],
  // You can remove the exports array since `isGlobal: true` makes it unnecessary
})
export class ConfigurationModule {} // Renamed to singular form