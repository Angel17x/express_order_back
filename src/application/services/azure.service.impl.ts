import {  Injectable } from '@nestjs/common';
import { AzureStorageService } from './azure.service';
import { UploadUseCase } from 'src/domain/usecases/upload.usecase';

@Injectable()
export class AzureStorageServiceImpl implements AzureStorageService {
  constructor(private uploadUseCase: UploadUseCase) {}

  async uploadFile(userId: string, folderType: string, file: Express.Multer.File): Promise<string> {
    return await this.uploadUseCase.uploadFile(userId, folderType, file);
  }

  // Agregar más métodos según sea necesario
}