import { Controller, Post, UploadedFile, UseInterceptors, Query, HttpException, Catch, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileServiceImpl } from '../services';
import { Response } from 'express';

@Controller() // Asegúrate de definir un prefijo si es necesario
@Catch(HttpException)
export class FileController {
  constructor(private readonly fileService: FileServiceImpl) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Query('userId') userId: string,
    @Query('folderType') folderType: string,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) : Promise<Response<string>>{
    // Asegurarse de que el archivo ha sido recibido correctamente
    if (!file) {
      throw new HttpException('No file provided', 400);
    }
    // Llamar al servicio para manejar la subida del archivo
      const result = await this.fileService.uploadFile(userId, file, folderType); // Asumiendo que el servicio necesita el objeto file completo
      return res.status(200).json({ fileUrl: result })
    
  }
}