import { Catch, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { LoginDto } from "src/application/dto/login.dto";
import { UserRepositoryImpl } from "src/infraestructure/repositories/user.repository.impl";
import { User } from "../schemas/user.schema";
import { UserDto } from "src/application/dto/user.dto";

@Injectable()
@Catch(HttpException)
export class UserUseCase {
  constructor(private readonly usersRepository: UserRepositoryImpl) { }

  async findEmailAndPassword(user: LoginDto): Promise<User> {
    try {
      const { email, password } = user;
      const repoUser = await this.usersRepository.find({  email, password });
      if (!repoUser) throw new HttpException('This user does not exist', HttpStatus.NOT_FOUND);
      return repoUser;

    } catch (error) {
      if (!error) throw new HttpException('Error when searching for user', HttpStatus.INTERNAL_SERVER_ERROR);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<any[]> {
    try {
      const repoUser = await this.usersRepository.findAll();
      const users = repoUser.map((user) => ({
        id: user._id,
        name: user.name,
        lastname: user.lastname,
        address: user.address,
        identity: user.identity,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        social: user.social ?? []
      }))
      return users;

    } catch (error) {
      if (!error) throw new HttpException('Error getting users', HttpStatus.INTERNAL_SERVER_ERROR);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);

    }
  }

  async findById(id: string): Promise<User> {
    try {
      const user = await this.usersRepository.findById(id);
      if(!user) throw new HttpException(`User ID does not exist`, HttpStatus.NOT_FOUND)
      return user;
    } catch (error) {
      if (!error) throw new HttpException('Error when searching for user', HttpStatus.INTERNAL_SERVER_ERROR);
      if(error.name === 'QueryFailedError') throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(user: UserDto): Promise<User> {
    try {
      const isExistsUser = await this.usersRepository.isExists(user.email);
      if (isExistsUser) throw new HttpException('User is exists', HttpStatus.BAD_REQUEST);
      const newUser = await this.usersRepository.create(
        {
          name: user.name,
          lastname: user.lastname,
          address: user.address,
          identity: user.identity,
          email: user.email,
          password: user.password,
          role: user.role,
          avatar: user.avatar,
          social: user.social ?? []
        }
      );
      return newUser;

    } catch (error) {
      if (!error) throw new HttpException('Error getting users', HttpStatus.INTERNAL_SERVER_ERROR);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id:string, user: UserDto): Promise<boolean> {
    try {
      const userUpdated = await this.usersRepository.updateAt(
        id,
        {
          name: user.name,
          lastname: user.lastname,
          address: user.address,
          identity: user.identity,
          email: user.email,
          password: user.password,
          role: user.role,
          avatar: user.avatar,
          social: user.social ?? []
        }
      );
      if(!userUpdated) throw new HttpException('Error updating user', HttpStatus.INTERNAL_SERVER_ERROR)
      return userUpdated;

    } catch (error) {
      if (!error) throw new HttpException('Error updating user', HttpStatus.INTERNAL_SERVER_ERROR);
      if(error.name === 'QueryFailedError') throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const userDeleted = await this.usersRepository.delete(id);
      if(!userDeleted) throw new HttpException(`'The user ID you are trying to delete does not exist`, HttpStatus.NOT_FOUND)
      return userDeleted;
    } catch (error) {
      if (!error) throw new HttpException('Error deleting user', HttpStatus.INTERNAL_SERVER_ERROR);
      if(error.name === 'QueryFailedError') throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

