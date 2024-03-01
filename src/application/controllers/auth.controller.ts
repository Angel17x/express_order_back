import { Body, Catch, Controller, HttpException, Post } from '@nestjs/common';
import { AuthServiceImpl } from '../services/auth.service.impl';
import { LoginDto } from '../dto/login.dto';
import { AuthEntity } from 'src/domain/entities/auth.entity';

@Controller()
@Catch(HttpException)
export class AuthController {
  constructor(private readonly authServiceImpl:AuthServiceImpl) {}
  
  @Post('/login')
  login(@Body() user: LoginDto): Promise<AuthEntity> {
    return this.authServiceImpl.login(user);
  }
}
