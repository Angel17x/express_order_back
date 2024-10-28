import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Put, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductServiceImpl } from '../services/product.service.impl';
import { CreateProductDto } from '../dto/create.product.dto';
import { Product } from 'src/domain/schemas/product.schema';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { Request, Response } from 'express';
import { UpdateProductDto } from '../dto/update.product.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
@UseGuards(AuthMiddleware)
export class ProductsController {
  constructor(private readonly productService: ProductServiceImpl) {}
  
  @Get('/products')
  async getProductsBySeller(@Res() res: Response, @Query('seller') seller:string): Promise<Response<any>> {
    const result = await this.productService.findAll(seller);
    return res.status(HttpStatus.OK).json(result);
  }
  @Get('/product')
  async getProductById(
    @Query() query:{ id: string, seller:string}, 
    @Res() res: Response, 
    ){
    const result = await this.productService.findById(query.id, query.seller);
    return res.status(HttpStatus.OK).json(result);
  }

  @Post('/create-product')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() product: CreateProductDto,
    @UploadedFile() file: Express.Multer.File, 
    @Req() req: Request, 
    @Res() res: Response): Promise<Response<Product>> {
    const user = req['user'];
    const result = await this.productService.create(product, user, file);
    return res.status(HttpStatus.OK).json(result);
  }

  @Put('/update-product')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Query('id') id: string, 
    @Body() product: UpdateProductDto, 
    @UploadedFile() file: Express.Multer.File, 
    @Req() req: Request, 
   ): Promise<void> {
    await this.productService.updateAt(id, product, req.user, file);
  }

  @Delete('/delete-product')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Query() id: string): Promise<void> {
    await this.productService.delete(id);
  }
}
