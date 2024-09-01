import { Module } from '@nestjs/common';
import { UploadController } from '../controllers/upload.controller';
import { AzureStorageServiceImpl, JwtServiceImpl } from '../services';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import { AuthMiddleware } from '../middlewares';
import { UploadUseCase } from 'src/domain/usecases/upload.usecase';
// import { diskStorage } from 'multer';
// import { extname } from 'path';

@Module({
  imports: [
    MulterModule.register({
      storage: multer.memoryStorage(), // Almacenamiento en memoria
      limits: { fileSize: 150 * 1024}
    }),
  ],
  controllers: [UploadController],
  providers: [
    AzureStorageServiceImpl,
    AuthMiddleware,
    JwtServiceImpl,
    UploadUseCase
  ],
})
export class UploadModule {}