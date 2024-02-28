import { User } from "src/domain/schemas/user.schema";
import { LoginDto } from "../dto/login.dto";
import { UserDto } from "../dto/user.dto";
import { UserService } from "./users.service";
import { UserUseCase } from "src/domain/usecases/user.usecase";
import { UUID } from "crypto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(private readonly userUseCase: UserUseCase) { }
  findEmailAndPassword(user: LoginDto): Promise<User> {
    return this.userUseCase.findEmailAndPassword(user);
  }
  findAll(): Promise<User[]> {
    return this.userUseCase.findAll();
  }
  create(user: UserDto): Promise<User> {
    return this.userUseCase.create(user);
  }
  updateAt(id: UUID, user: UserDto): Promise<boolean> {
    return this.userUseCase.update(id, user);
  }
  delete(id: UUID): Promise<boolean> {
    return this.userUseCase.delete(id);
  }
  
}