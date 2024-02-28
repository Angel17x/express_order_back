import { LoginDto } from "src/application/dto/login.dto";
import { User } from "../schemas/user.schema";
import { GenericRepository } from "./generic.repository";
import { UserDto } from "src/application/dto/user.dto";
import { UUID } from "crypto";

export interface UserRepository extends GenericRepository<User> { 
  find(user: LoginDto): Promise<User>;
  findById(id: any): Promise<User | null>;
  findAll(): Promise<User[]>;
  create(entity: UserDto): Promise<User>;
  updateAt(id:UUID, entity: UserDto): Promise<any>;
  delete(id: UUID): Promise<boolean>;
  isExists(email: string): Promise<boolean>;
}