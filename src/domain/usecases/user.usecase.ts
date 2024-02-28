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
      if (!repoUser) throw new HttpException('Este usuario no existe', HttpStatus.NOT_FOUND);
      return repoUser;

    } catch (error) {
      if (!error) throw new HttpException('Error al buscar usuario', HttpStatus.INTERNAL_SERVER_ERROR);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const repoUser = await this.usersRepository.findAll();
      return repoUser;

    } catch (error) {
      if (!error) throw new HttpException('Error al obtener los usuarios', HttpStatus.INTERNAL_SERVER_ERROR);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);

    }
  }

  async create(user: UserDto): Promise<User> {
    try {
      const isExistsUser = await this.usersRepository.isExists(user.email);
      if (isExistsUser) throw new HttpException('El usuario ya existe', HttpStatus.BAD_REQUEST);
      const newUser = await this.usersRepository.create(
        {
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          password: user.password,
          address: user.address,
          role: user.role
        }
      );
      return newUser;

    } catch (error) {
      if (!error) throw new HttpException('Error al obtener los usuarios', HttpStatus.INTERNAL_SERVER_ERROR);
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
          email: user.email,
          password: user.password,
          address: user.address,
          role: user.role
        }
      );
      if(!userUpdated) throw new HttpException('Error al actualizar el usuario', HttpStatus.INTERNAL_SERVER_ERROR)
      return userUpdated;

    } catch (error) {
      if (!error) throw new HttpException('Error al actualizar el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
      if(error.name === 'QueryFailedError') throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const userDeleted = await this.usersRepository.delete(id);
      if(!userDeleted) throw new HttpException(`'El ID de usuario que estas intentando eliminar no existe`, HttpStatus.NOT_FOUND)
      return userDeleted;
    } catch (error) {
      if (!error) throw new HttpException('Error al eliminar el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
      if(error.name === 'QueryFailedError') throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

