import { ProductsWithEcommerceDto } from "src/application/dto/products-with-ecommerce.dto";
import { Product } from "../schemas/product.schema";
import { CreateProductDto } from "src/application/dto/create.product.dto";

export interface ProductRepository { 
  find(product: CreateProductDto): Promise<Product>;
  findById(id: any, ecommerce: ProductsWithEcommerceDto): Promise<Product | null>;
  findAll(ecommerce: ProductsWithEcommerceDto): Promise<Product[]>;
  create(product: CreateProductDto): Promise<Product>;
  updateAt(id:string, entity: CreateProductDto): Promise<any>;
  delete(id: string): Promise<boolean>;
  isExists(name: string): Promise<boolean>;
}