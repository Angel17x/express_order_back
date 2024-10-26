import {  Injectable } from '@nestjs/common';
import { AzureStorageService } from './azure.service';
import { UploadUseCase } from 'src/domain/usecases/upload.usecase';

@Injectable()
export class AzureStorageServiceImpl implements AzureStorageService {
  constructor(private uploadUseCase: UploadUseCase) {}

  async uploadFile(userId: string, folderType: string, file: Express.Multer.File): Promise<string> {
    return await this.uploadUseCase.uploadFile(userId, folderType, file);
  }
  async updateFile(userId: string, folderType: string, file: Express.Multer.File, oldname:string, newName:string): Promise<string> {
    return await this.uploadUseCase.updateFile(userId, folderType, file, oldname, newName);
  }

  // Agregar más métodos según sea necesario
}