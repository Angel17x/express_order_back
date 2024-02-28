import { UUID } from 'crypto';
import { User } from 'src/domain/schemas/user.schema';
import { UserDto } from '../dto/user.dto';
import { LoginDto } from '../dto/login.dto';


export interface UserService {
  findEmailAndPassword(user: LoginDto): Promise<User>;
  findAll(): Promise<User[]>;
  create(user: UserDto): Promise<User>;
  updateAt(id:UUID, user: UserDto): Promise<boolean>;
  delete(id:UUID): Promise<boolean>;
}
