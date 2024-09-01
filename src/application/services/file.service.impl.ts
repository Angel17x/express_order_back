// src/services/file.service.impl.ts
import { Injectable, HttpException, Logger, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Storage, File } from 'megajs';

@Injectable()
export class FileServiceImpl {
  private storage: Storage;
  private storageBasePath: string;

  constructor(private configService: ConfigService) {
    const email = this.configService.get<string>('MEGA_EMAIL');
    const password = this.configService.get<string>('MEGA_PASSWORD');
    this.storageBasePath = this.configService.get<string>('MEGA_BASE_PATH');

    this.storage = new Storage({
      email: email,
      password: password,
      autologin: true
    });
    

    this.storage.on('update', (err) => {
      // console.error('Error connecting to MEGA:', err);
      // throw new HttpException('MEGA connection error', 500);
    });
  }

  async uploadFile(userId: string, file: Express.Multer.File, folderType: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.storage.ready.then(() => {
        const folderPath = `${this.storageBasePath}/${userId}/${folderType}`;

        // Buscar o crear la carpeta
        this.findOrCreateFolder(folderPath).then((folder) => {
          const buffer = Buffer.from(file.buffer);
          const options = { name: file.originalname, size: buffer.length, target: folder };

          // Verificar si ya existe el archivo
          const f = folder?.children?.find((x) => x.name === file.originalname);
          Logger.warn(f);
          if (f) {
            Logger.log(`File "${f.name}" already exists in "${folderPath}".`, 'FileService');
            reject(new HttpException(`File ${f.name} already exists in ${folderPath}`, HttpStatus.BAD_REQUEST));
            return;
          }
          const uploadStream = this.storage.upload(options);
          uploadStream.on('complete', (file) => {
            console.log('Upload complete:');
            resolve(file.link(false)); // La URL del archivo
          });

          uploadStream.on('error', (err) => {
            console.error('Upload error:', err);
            reject(new HttpException('Error uploading file', 500));
          });

          uploadStream.write(buffer);
          uploadStream.end();
        }).catch(err => {
          reject(new HttpException(err, 500));
        });

      }).catch(err => {
        console.error('Error preparing storage:', err);
        reject(new HttpException('Error preparing MEGA storage', 500));
      });
    });
  }

  private async findOrCreateFolder(path: string): Promise<File> {
    if (!path) {
      console.error('Received invalid path:', path);
      throw new HttpException('Invalid path provided', 400);
    }
  
    let currentFolder = this.storage.root;
  
    try {
      for (const name of path.split('/')) {
        if (!name) {
          console.error('Invalid directory name in path:', path);
          continue;  // o maneja como un error según tu lógica de negocio
        }
        let folder = currentFolder?.children?.find(child => child.name === name && child.directory);
        if (!folder) {
          folder = await currentFolder.mkdir(name);
        }
        currentFolder = folder;
      }
    } catch (err) {
      console.error('Error creating folder in MEGA:', err);
      throw new HttpException(`Error creating folder '${path}' in MEGA`, 500);
    }
  
    return currentFolder;
  }
  
}