import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BlobServiceClient } from '@azure/storage-blob';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadUseCase {
  private blobServiceClient: BlobServiceClient;
  private containerStorage: string;

  constructor(private readonly configService: ConfigService) {
    const azureConnectionString = this.configService.get<string>('AZURE_STORAGE_CONNECTION_STRING');
    this.blobServiceClient = BlobServiceClient.fromConnectionString(azureConnectionString);
    this.containerStorage = this.configService.get<string>('AZURE_STORAGE_CONTAINER');
  }

  async uploadFile(userId: string, folderType: string, file: Express.Multer.File): Promise<string> {
    try {
      const containerClient = this.blobServiceClient.getContainerClient(this.containerStorage);
      const containerIsExists = await containerClient.exists();
      if(!containerIsExists) throw new HttpException(`container '${this.containerStorage}' is not exists`, HttpStatus.BAD_REQUEST);
      const blockBlobClient = containerClient.getBlockBlobClient(`${userId}/${folderType}/${file.originalname}`);
      const fileExists = await blockBlobClient.exists();
      if(fileExists) throw new HttpException(`file '${file.originalname}' is exists`, HttpStatus.BAD_REQUEST);

      // Subir los datos al blob
      await blockBlobClient.uploadData(file.buffer, {
        blobHTTPHeaders: { blobContentType: file.mimetype },
      });

      return blockBlobClient.url;
    } catch (error) {
      if (!error) throw new HttpException('Error upload file', HttpStatus.INTERNAL_SERVER_ERROR);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Agregar más métodos según sea necesario
}