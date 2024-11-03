import { Catch, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from 'src/application/dto/login.dto';
import { User } from '../schemas/user.schema';
import { UserRepositoryImpl } from 'src/infraestructure/repositories/user.repository.impl';
import { UserDto } from 'src/application/dto/user.dto';
import { UploadUseCase } from './upload.usecase';
import { UpdateUserDto } from 'src/application/dto/update-user.dto';

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
      if(isExistsUser) throw new HttpException('Este usuario ya existe', HttpStatus.BAD_REQUEST);
      if(!file) throw new HttpException('No se ha adjuntado un archivo', HttpStatus.BAD_REQUEST);
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
        avatar: avatarUrl,
        social: repoUser.social ?? []
      });
      return repoUser;
    } catch (error) {
      if (!error) throw new HttpException('Error al registrar al usuario', HttpStatus.INTERNAL_SERVER_ERROR);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateInfo(id: string, user: UpdateUserDto, file?: Express.Multer.File): Promise<User> {
    try {
      console.log(id)
      if(!id) throw new HttpException('ID de usuario autenticado no existe', HttpStatus.BAD_REQUEST);
      if(!user) throw new HttpException('el usuario es requerido', HttpStatus.BAD_REQUEST);
      const repoUser = await this.usersRepository.findById(id);
      console.log(repoUser);
      if(!repoUser) throw new HttpException('El ID que intentas modificar no pertenece al usuario logeado', HttpStatus.NOT_FOUND);
      if(file){
        const avatarUrl = await this.uploadUseCase.updateFile((repoUser._id).toString(), 'user', file, 'avatar', 'avatar');
        user.avatar = avatarUrl;
      }
      await this.usersRepository.updateAt(id, {
        name: user.name ?? repoUser.name,
        lastname: user.lastname,
        address: user.address ?? repoUser.address,
        identity: user.identity ?? repoUser.identity,
        email: user.email ?? repoUser.email,
        password: user.password ?? repoUser.password,
        role: user.role ?? repoUser.role,
        avatar: user.avatar ?? repoUser.avatar.valueOf(),
        social: user.social ?? repoUser.social
      });
      return await this.usersRepository.findById(id);
    } catch (error) {
      if (!error) throw new HttpException('Error al modificar al usuario', HttpStatus.INTERNAL_SERVER_ERROR);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
