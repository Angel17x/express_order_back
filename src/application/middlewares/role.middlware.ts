import { Request, Response, NextFunction } from 'express';
import { Role } from '../enums/role.enum';
import { HttpException, HttpStatus, NestMiddleware } from '@nestjs/common';

export const createRolesMiddleware = (allowedRoles: Role[]): NestMiddleware => {
  return {
    use(req: Request, res: Response, next: NextFunction) {
      try {
        const user = req.user;
        if (!user) throw new HttpException('Acceso denegado', HttpStatus.FORBIDDEN);
        if (!allowedRoles.includes(user.role)) throw new HttpException('Acceso denegado', HttpStatus.FORBIDDEN);
        next();
      } catch (error) {
        if (!error) throw new HttpException('Acceso denegado', HttpStatus.INTERNAL_SERVER_ERROR);
        throw new HttpException(error.message, error.status);
      }
    },
  };
};
