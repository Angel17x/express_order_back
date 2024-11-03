import { Product } from "src/domain/schemas/product.schema";
import { Injectable } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductUseCase } from "src/domain/usecases/product.usecase";
import { CreateProductDto } from "../dto/create.product.dto";
import { User } from "src/domain/schemas/user.schema";
import { UpdateProductDto } from "../dto/update.product.dto";

@Injectable()
export class ProductServiceImpl implements ProductService {
  constructor(private readonly productUseCase: ProductUseCase) { }
  
  findAll(seller: string): Promise<Product[]> {
    return this.productUseCase.findAll(seller);
  }
  findById(id: string, seller: string): Promise<Product> {
    return this.productUseCase.findById(id, seller);
  }
  create(product: CreateProductDto, user:User, file: Express.Multer.File): Promise<Product> {
    return this.productUseCase.create(product, user, file);
  }
  updateAt(id: string, product: UpdateProductDto, user:User, file?: Express.Multer.File): Promise<boolean> {
    return this.productUseCase.update(id, product, user, file);
  }
  delete(id: string, user:User): Promise<boolean> {
    return this.productUseCase.delete(id, user);
  }
  
}