import { Product } from "../schemas/product.schema";
import { CreateProductDto } from "src/application/dto/create.product.dto";

export interface ProductRepository { 
  findById(id: any, seller: string): Promise<Product | null>;
  findAll(seller: string): Promise<Product[]>;
  create(product: CreateProductDto): Promise<Product>;
  updateAt(id:string, entity: CreateProductDto): Promise<any>;
  delete(id: string): Promise<boolean>;
  isExists(name: string): Promise<boolean>;
}