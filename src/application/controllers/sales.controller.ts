import { Controller, UseGuards, Post, Body, Req, Put, HttpCode, HttpStatus, Delete } from "@nestjs/common";
import { Query } from "mongoose";
import { Product } from "src/domain/schemas/product.schema";
import { CreateProductDto } from "../constraints/isdecimal.constraint";
import { ProductsWithEcommerceDto } from "../dto/products-with-ecommerce.dto";
import { AuthMiddleware } from "../middlewares/auth.middleware";

@Controller()
@UseGuards(AuthMiddleware)
export class SalesController {
  constructor() {}
  
  @Post('/sales')
  getSales(): any {
    return ({ message: "Method not implement" });
  }
}
  
