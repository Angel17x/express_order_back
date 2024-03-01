import { User } from 'src/domain/schemas/user.schema';
import { UserDto } from '../dto/user.dto';
import { LoginDto } from '../dto/login.dto';


export interface UserService {
  findEmailAndPassword(user: LoginDto): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User>;
  create(user: UserDto): Promise<User>;
  updateAt(id:string, user: UserDto): Promise<boolean>;
  delete(id:string): Promise<boolean>;
}
