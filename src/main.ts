import { NestFactory } from '@nestjs/core';
import { AppModule } from './application/modules/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { HttpErrorFilter } from './application/middlewares/http.error-filter.middleware';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule); 
  // Configuración para el ValidationPipe obtenida de las variables de entorno
  const globalPipeOptions = {
    whitelist: process.env.SERVER_GLOBALPIPE_WHITELIST === 'true',
    transform: process.env.SERVER_GLOBALPIPE_TRANSFORM === 'true',
    forbidNonWhitelisted: process.env.SERVER_GLOBALPIPE_FORBID_NON_WHITE_LISTED === 'true',
  };

  app.useGlobalPipes(new ValidationPipe(globalPipeOptions));
  app.useGlobalFilters(new HttpErrorFilter());
  app.setGlobalPrefix(`${process.env.SERVER_GLOBAL_PREFIX}/${process.env.SERVER_VERSION}`);

  const port = process.env.PORT || 80;
  
  await app.listen(port, '0.0.0.0'); 
  Logger.log(`Server : ${process.env.NODE_ENV} is running on ${port}`, 'Bootstrap');
}
bootstrap();
