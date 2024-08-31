import { Controller, UseGuards, Post } from '@nestjs/common';
import { AuthMiddleware } from '../middlewares/auth.middleware';

@Controller()
@UseGuards(AuthMiddleware)
export class SalesController {
  constructor() {}

  @Post('/sales')
  getSales(): any {
    return { message: 'Method not implement' };
  }
}
