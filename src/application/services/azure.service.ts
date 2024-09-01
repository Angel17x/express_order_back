export interface AzureStorageService {
  uploadFile(userId: string, folderType: string, file: Express.Multer.File):Promise<string>
}