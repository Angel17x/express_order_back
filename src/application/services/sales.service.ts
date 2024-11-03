import { User } from 'src/domain/schemas/user.schema';
import { Sales } from 'src/domain/schemas/sales.schema';
import { CreateSalesDto } from '../dto/create.sales.dto';


export interface SalesService {
  findAll(seller: string): Promise<Sales[]>;
  findById(id: string, seller: string): Promise<Sales>;
  create(sale: CreateSalesDto, user:User, file: Express.Multer.File): Promise<Sales>;
  updateAt(id:string, sale: CreateSalesDto, user:User, file?: Express.Multer.File): Promise<boolean>;
  delete(id:string, user:User): Promise<boolean>;
}
