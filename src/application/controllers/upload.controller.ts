import { Controller, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AzureStorageServiceImpl } from '../services';
import { FileQueryDto } from '../dto/file-query.dto';

@Controller()
export class UploadController {
  constructor(private readonly azureStorageService: AzureStorageServiceImpl ) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Query() path: FileQueryDto,
    @UploadedFile() file: Express.Multer.File) {
    const response = await this.azureStorageService.uploadFile(path.userId, path.folderType, file);
    return { message: 'File uploaded successfully', requestId: response };
  }
}