import { User } from "src/domain/schemas/user.schema";
import { LoginDto } from "../dto/login.dto";
import { UserDto } from "../dto/user.dto";
import { UserService } from "./users.service";
import { UserUseCase } from "src/domain/usecases/user.usecase";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(private readonly userUseCase: UserUseCase) { }
  findEmailAndPassword(user: LoginDto): Promise<User> {
    return this.userUseCase.findEmailAndPassword(user);
  }
  findAll(): Promise<any[]> {
    return this.userUseCase.findAll();
  }
  findById(id: string): Promise<User> {
    return this.userUseCase.findById(id);
  }
  create(user: UserDto): Promise<User> {
    return this.userUseCase.create(user);
  }
  updateAt(id: string, user: UserDto): Promise<boolean> {
    return this.userUseCase.update(id, user);
  }
  delete(id: string): Promise<boolean> {
    return this.userUseCase.delete(id);
  }
  
}