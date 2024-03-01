import { Product } from "src/domain/schemas/product.schema";
import { Injectable } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductUseCase } from "src/domain/usecases/product.usecase";
import { CreateProductDto } from "../dto/create.product.dto";
import { ProductsWithEcommerceDto } from "../dto/products-with-ecommerce.dto";
import { User } from "src/domain/schemas/user.schema";

@Injectable()
export class ProductServiceImpl implements ProductService {
  constructor(private readonly productUseCase: ProductUseCase) { }
  
  findAll(ecommerce: ProductsWithEcommerceDto): Promise<Product[]> {
    return this.productUseCase.findAll(ecommerce);
  }
  findById(id: string, ecommerce: ProductsWithEcommerceDto): Promise<Product> {
    return this.productUseCase.findById(id, ecommerce);
  }
  create(product: CreateProductDto, user:User): Promise<Product> {
    return this.productUseCase.create(product, user);
  }
  updateAt(id: string, product: CreateProductDto, user:User): Promise<boolean> {
    return this.productUseCase.update(id, product, user);
  }
  delete(id: string): Promise<boolean> {
    return this.productUseCase.delete(id);
  }
  
}