import { Catch, Controller, HttpException } from '@nestjs/common';

@Controller()
@Catch(HttpException)
export class AuthController {}
