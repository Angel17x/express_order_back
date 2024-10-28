import { Body, Catch, Controller, HttpException, Post, Put, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthServiceImpl } from '../services';
import { LoginDto } from '../dto/login.dto';
import { AuthEntity } from 'src/domain/entities/auth.entity';
import { UserDto } from '../dto/user.dto';
import { User } from 'src/domain/schemas/user.schema';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from '../dto/update-user.dto';
import { AuthMiddleware } from '../middlewares';

@Controller()
@Catch(HttpException)
export class AuthController {
  constructor(private readonly authServiceImpl: AuthServiceImpl) {}

  @Post('/login')
  async login(@Body() user: LoginDto, @Res() res: Response): Promise<Response<AuthEntity>> {
    const result = await this.authServiceImpl.login(user);
    return res.status(200).json(result);
  }

  @Post('/register')
  @UseInterceptors(FileInterceptor('file'))
  async register(
      @Body() user: UserDto, 
      @Res() res: Response, 
      @UploadedFile() file: Express.Multer.File
  ): Promise<Response<User>> {
    const result = await this.authServiceImpl.registerUser(user, file);
    return res.status(200).json(result);
  }

  @Put('/update-user-info')
  @UseGuards(AuthMiddleware)
  @UseInterceptors(FileInterceptor('file'))
  async updateInfo(
      @Body() user: UpdateUserDto, 
      @Req() req: Request,
      @Res() res: Response, 
      @UploadedFile() file: Express.Multer.File
  ): Promise<Response<User>> {
    const userAuth = req['user'];
    console.log(userAuth._id);
    console.log(user);
    const result = await this.authServiceImpl.updateInfo(userAuth._id, user, file);
    return res.status(200).json(result);
  }
}
