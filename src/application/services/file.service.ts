export interface FileService {
  uploadFile(userId: string, filePath: string, folderName: string): Promise<string>
}