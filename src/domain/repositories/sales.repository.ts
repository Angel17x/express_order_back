import { CreateSalesDto } from "src/application/dto/create.sales.dto";
import { Sales } from "../schemas/sales.schema";

export interface SalesRepository {
  findAll({}): Promise<Sales[]>;
  findById(id: string, userId: string): Promise<Sales | null>;
  find(): Promise<Sales | null>;
  create(entity: CreateSalesDto): Promise<Sales>;
  updateAt(id:any, entity: CreateSalesDto): Promise<any>;
  delete(id: any): Promise<boolean>;
} 