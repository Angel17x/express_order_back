import { LoginDto } from "src/application/dto/login.dto";
import { User } from "../schemas/user.schema";
import { GenericRepository } from "./generic.repository";
import { UserDto } from "src/application/dto/user.dto";

export interface UserRepository { 
  find(user: LoginDto): Promise<User>;
  findById(id: any): Promise<User | null>;
  findAll(): Promise<User[]>;
  create(entity: UserDto): Promise<User>;
  updateAt(id:string, entity: UserDto): Promise<any>;
  delete(id: string): Promise<boolean>;
  isExists(email: string): Promise<boolean>;
  findSellerById(id: string): Promise<string>;
}