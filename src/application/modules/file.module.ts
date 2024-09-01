import { Module } from '@nestjs/common';
import { FileController } from '../controllers/files.controller';
import { FileServiceImpl } from '../services';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
// import { diskStorage } from 'multer';
// import { extname } from 'path';

@Module({
  imports: [
    MulterModule.register({
      storage: multer.memoryStorage(), // Almacenamiento en memoria
      limits: { fileSize: 150 * 1024}
      
    }),
  ],
  controllers: [FileController],
  providers: [FileServiceImpl],
})
export class FileModule {}