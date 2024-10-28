import { User } from 'src/domain/schemas/user.schema';
import { CreateProductDto } from '../dto/create.product.dto';
import { Product } from 'src/domain/schemas/product.schema';
import { UpdateProductDto } from '../dto/update.product.dto';


export interface ProductService {
  findAll(seller: string): Promise<Product[]>;
  findById(id: string, seller: string): Promise<Product>;
  create(product: CreateProductDto, user:User, file: Express.Multer.File): Promise<Product>;
  updateAt(id:string, product: UpdateProductDto, user:User, file?: Express.Multer.File): Promise<boolean>;
  delete(id:string): Promise<boolean>;
}
