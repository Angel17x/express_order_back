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

  async uploadFile(userId: string, folderType: string, file: Express.Multer.File, name?:string): Promise<string> {
    try {
      if(!file) throw new HttpException('No se ha adjuntado un archivo', HttpStatus.BAD_REQUEST);
      const containerClient = this.blobServiceClient.getContainerClient(this.containerStorage);
      const containerIsExists = await containerClient.exists();
      if(!containerIsExists) throw new HttpException(`container '${this.containerStorage}' is not exists`, HttpStatus.BAD_REQUEST);
      const blockBlobClient = containerClient.getBlockBlobClient(`${userId}/${folderType}/${name ?? file.originalname}`);
      const fileExists = await blockBlobClient.exists();
      if(fileExists) throw new HttpException(`file '${name ?? file.originalname}' is exists`, HttpStatus.BAD_REQUEST);

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

  async updateFile(userId: string, folderType: string, file: Express.Multer.File, oldName: string, newName: string): Promise<string> {
    try {
      if (!file) {
        throw new HttpException('No se ha adjuntado un archivo', HttpStatus.BAD_REQUEST);
      }

      const containerClient = this.blobServiceClient.getContainerClient(this.containerStorage);
      const containerExists = await containerClient.exists();
      if (!containerExists) {
        throw new HttpException(`El contenedor '${this.containerStorage}' no existe`, HttpStatus.BAD_REQUEST);
      }

      // Eliminar el archivo viejo si existe
      const oldBlobClient = containerClient.getBlockBlobClient(`${userId}/${folderType}/${oldName}`);
      const oldBlobExists = await oldBlobClient.exists();
      if (oldBlobExists) {
        await oldBlobClient.delete();
      }

      // Subir el nuevo archivo
      const newBlobClient = containerClient.getBlockBlobClient(`${userId}/${folderType}/${newName}`);
      await newBlobClient.uploadData(file.buffer, {
        blobHTTPHeaders: { blobContentType: file.mimetype },
      });

      return newBlobClient.url;
    } catch (error) {
      // Proporcionar una respuesta de error más específica basada en el error capturado
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  async deleteFile(userId: string, folderType: string, fileName: string): Promise<boolean> {
    try {
      const containerClient = this.blobServiceClient.getContainerClient(this.containerStorage);
      const containerExists = await containerClient.exists();
      if (!containerExists) {
        throw new HttpException(`El contenedor '${this.containerStorage}' no existe`, HttpStatus.BAD_REQUEST);
      }

      // Eliminar el archivo viejo si existe
      const oldBlobClient = containerClient.getBlockBlobClient(`${userId}/${folderType}/${fileName}`);
      const oldBlobExists = await oldBlobClient.exists();
      if (!oldBlobExists) {
        throw new HttpException('file is not exists', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      await oldBlobClient.delete();
      return true;
    } catch (error) {
      throw new HttpException(error.message, error.status?? HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Agregar más métodos según sea necesario
}