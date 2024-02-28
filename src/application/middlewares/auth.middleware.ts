import { Catch, HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtServiceImpl } from '../services/jwt.service.impl';
import { JwtEnum } from '../enums/jwt.enum';

@Injectable()
@Catch(HttpException)
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtServiceImpl) { }
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = (req.headers.authorization ?? '').split(' ')[1] ?? null;
      console.log(token)
      if (!token){
        throw new HttpException(JwtEnum.FORBIDDEN, HttpStatus.FORBIDDEN);
      }
      await this.jwtService.verify(token);
      next();
    } catch (error) {
      if (!error) throw new HttpException('Error al leer el token de acceso', HttpStatus.INTERNAL_SERVER_ERROR);
      const err = error.name === 'HttpException' ? error.response : error.name;
      switch(err){
        case JwtEnum.ERROR:
          throw new HttpException('Token de autenticación inválido', HttpStatus.BAD_REQUEST);
        case JwtEnum.EXPIRE:
          throw new HttpException('Token de autenticación expirado', HttpStatus.UNAUTHORIZED);
        case JwtEnum.UNAUTHORIZED:
          throw new HttpException('Token no proporcionado', HttpStatus.FORBIDDEN);
        case JwtEnum.FORBIDDEN:
          throw new HttpException('Token no proporcionado', HttpStatus.FORBIDDEN);
        default:
          throw new HttpException('Error al verificar el token de autenticación', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}