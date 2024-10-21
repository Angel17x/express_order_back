import { User } from 'src/domain/schemas/user.schema';
import { CreateProductDto } from '../dto/create.product.dto';
import { Product } from 'src/domain/schemas/product.schema';
import { ProductsWithEcommerceDto } from '../dto/products-with-ecommerce.dto';


export interface ProductService {
  findAll(ecommerce: ProductsWithEcommerceDto): Promise<Product[]>;
  findById(id: string, ecommerce: ProductsWithEcommerceDto): Promise<Product>;
  create(product: CreateProductDto, user:User, file: Express.Multer.File): Promise<Product>;
  updateAt(id:string, product: CreateProductDto, user:User): Promise<boolean>;
  delete(id:string): Promise<boolean>;
}
