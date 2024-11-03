import { Sales } from "src/domain/schemas/sales.schema";
import { Injectable } from "@nestjs/common";
import { SalesService } from "./sales.service";
import { SalesUseCase } from "src/domain/usecases/sales.usecase";
import { User } from "src/domain/schemas/user.schema";
import { CreateSalesDto } from "../dto/create.sales.dto";

@Injectable()
export class SalesServiceImpl implements SalesService {
  constructor(private readonly salesUseCase: SalesUseCase) { }
  
  findAll(seller: string): Promise<Sales[]> {
    return this.salesUseCase.findAll(seller);
  }
  findById(id: string, seller: string): Promise<Sales> {
    return this.salesUseCase.findById(id, seller);
  }
  create(sale: CreateSalesDto, user: User, file: Express.Multer.File): Promise<Sales> {
    throw new Error("Method not implemented.");
  }
  updateAt(id: string, sale: CreateSalesDto, user: User, file?: Express.Multer.File): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  delete(id: string, user: User): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  
}