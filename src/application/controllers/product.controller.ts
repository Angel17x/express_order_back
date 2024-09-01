import { Body, Controller, Delete, HttpCode, HttpStatus, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ProductServiceImpl } from '../services/product.service.impl';
import { CreateProductDto } from '../dto/create.product.dto';
import { Product } from 'src/domain/schemas/product.schema';
import { ProductsWithEcommerceDto } from '../dto/products-with-ecommerce.dto';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { Request, Response } from 'express';

@Controller()
@UseGuards(AuthMiddleware)
export class ProductsController {
  constructor(private readonly productService: ProductServiceImpl) {}
  
  @Post('/products')
  async getProductsBySeller(@Res() res: Response, @Query() sellerId:ProductsWithEcommerceDto): Promise<Response<any>> {
    const result = await this.productService.findAll(sellerId);
    return res.status(HttpStatus.OK).json(result);
  }
  @Post('/product')
  async getProductById(@Query('id') id: string, @Res() res: Response, @Query() sellerId:ProductsWithEcommerceDto){
    const result = await this.productService.findById(id, sellerId);
    return res.status(HttpStatus.OK).json(result);
  }

  @Post('/create-product')
  async create(@Body() product: CreateProductDto, @Req() req: Request, @Res() res: Response): Promise<Response<Product>> {
    const result = await this.productService.create(product, req.user);
    return res.status(HttpStatus.OK).json(result);
  }

  @Put('/update-product')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Query() id: string, @Body() product: CreateProductDto, @Req() req: Request, @Res() res: Response): Promise<Response<void>> {
    await this.productService.updateAt(id, product, req.user);
    return res.status(HttpStatus.NO_CONTENT);
  }

  @Delete('/delete-product')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Query() id: string): Promise<void> {
    await this.productService.delete(id);
  }
}
