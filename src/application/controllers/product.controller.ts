import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ProductServiceImpl } from '../services/product.service.impl';
import { CreateProductDto } from '../dto/create.product.dto';
import { Product } from 'src/domain/schemas/product.schema';
import { ProductsWithEcommerceDto } from '../dto/products-with-ecommerce.dto';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { Request } from 'express';

@Controller()
@UseGuards(AuthMiddleware)
export class ProductsController {
  constructor(private readonly productService: ProductServiceImpl) {}
  
  @Post('/products')
  getUserById(@Query('id') id: string, @Body() ecommerce:ProductsWithEcommerceDto): Promise<any> {
    return (
      id ? 
      this.productService.findById(id, ecommerce) : 
      this.productService.findAll(ecommerce)
    );
  }

  @Post('/create-product')
  async create(@Body() product: CreateProductDto, @Req() req: Request): Promise<Product> {
    return this.productService.create(product, req.user);
  }

  @Put('/update-product')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Query() id: string, @Body() product: CreateProductDto, @Req() req: Request): Promise<void> {
    await this.productService.updateAt(id, product, req.user);
  }

  @Delete('/delete-product')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Query() id: string): Promise<void> {
    await this.productService.delete(id);
  }
}
