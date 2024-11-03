import { Controller, UseGuards, Get, Query, HttpStatus, Res } from '@nestjs/common';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { SalesServiceImpl } from '../services/sales.service.impl';
import { Response } from 'express';

@Controller()
@UseGuards(AuthMiddleware)
export class SalesController {
  constructor(private readonly salesService: SalesServiceImpl) {}

  @Get('/sales')
  async getSales(
    @Query('seller') seller:string, 
    @Res() res: Response
  ): Promise<Response<any>> {
    const result = await this.salesService.findAll(seller);
    return res.status(HttpStatus.OK).json(result);
  }
}
