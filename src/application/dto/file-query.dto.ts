import { IsNotEmpty, IsString } from "class-validator";

export class FileQueryDto {
  @IsNotEmpty()
  @IsString()
  userId:string;

  @IsNotEmpty()
  @IsString()
  folderType:string;

}