import { Catch, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from 'src/application/dto/login.dto';
import { User } from '../schemas/user.schema';
import { UserRepositoryImpl } from 'src/infraestructure/repositories/user.repository.impl';
import { UserDto } from 'src/application/dto/user.dto';
import { UploadUseCase } from './upload.usecase';

@Injectable()
@Catch(HttpException)
export class AuthUseCase {
  constructor(
    private readonly usersRepository: UserRepositoryImpl,
    private readonly uploadUseCase: UploadUseCase
  ) {}

  async auth(user: LoginDto): Promise<User> {
    try {
      const repoUser = await this.usersRepository.find({ email: user.email, password: user.password });
      if (!repoUser) throw new HttpException( 'Credenciales Inválidas', HttpStatus.UNAUTHORIZED);
      //return this.authService.generateToken(repoUser);
      return repoUser;
    } catch (error) {
      if (!error) throw new HttpException('Error al autenticar al usuario', HttpStatus.INTERNAL_SERVER_ERROR);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async register(user: UserDto, file: Express.Multer.File): Promise<User> {
    try {
      if(!user) throw new HttpException('el usuario es requerido', HttpStatus.BAD_REQUEST);
      const isExistsUser = await this.usersRepository.isExists(user.email);
      if(isExistsUser) {
        throw new HttpException('Este usuario ya existe', HttpStatus.BAD_REQUEST);
      }
      const repoUser = await this.usersRepository.create(user);
      const avatarUrl = await this.uploadUseCase.uploadFile((repoUser._id).toString(), 'user', file, 'avatar');
      repoUser.avatar = avatarUrl;
      await this.usersRepository.updateAt((repoUser._id).toString(), {
        name: repoUser.name,
        lastname: repoUser.lastname,
        address: repoUser.address,
        identity: repoUser.identity,
        email: repoUser.email,
        password: repoUser.password,
        role: repoUser.role,
        avatar: avatarUrl
      });
      return repoUser;
    } catch (error) {
      if (!error) throw new HttpException('Error al registrar al usuario', HttpStatus.INTERNAL_SERVER_ERROR);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
