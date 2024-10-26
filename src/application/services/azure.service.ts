export interface AzureStorageService {
  uploadFile(userId: string, folderType: string, file: Express.Multer.File, name?:string):Promise<string>
  updateFile(userId: string, folderType: string, file: Express.Multer.File, oldname: string, newName: string):Promise<string>
}