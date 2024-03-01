import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateSalesDto } from "src/application/dto/create-sales.dto";
import { CreateProductDto } from "src/application/dto/create.product.dto";
import { ProductsWithEcommerceDto } from "src/application/dto/products-with-ecommerce.dto";
import { ProductRepository } from "src/domain/repositories/product.repository";
import { SalesRepository } from "src/domain/repositories/sales.repository";
import { Sales } from "src/domain/schemas/sales.schema";

@Injectable()
export class SalesRepositoryImpl implements SalesRepository {
  constructor(@InjectModel(Sales.name) private salesModel: Model<Sales>){}
  find(): Promise<Sales> {
    throw new Error("Method not implemented.");
  }

  async findById(id: string): Promise<Sales | null> {
    const _id = new Types.ObjectId(id);
    return this.salesModel.findOne({ _id }).exec();
  }

  async findAll(userId: string): Promise<Sales[]> {
    const _id = new Types.ObjectId(userId);
    return this.salesModel.find({ userId: _id }).exec();
  }

  async create(entity: CreateSalesDto): Promise<Sales> {
    const newSale = new this.salesModel(entity);
    return newSale.save();
  }

  async updateAt(id: string, entity: CreateSalesDto): Promise<boolean> {
    const _id = new Types.ObjectId(id);
    const result = await this.salesModel.findByIdAndUpdate(_id, entity, { new: true }).exec();
    return result != null; // Devuelve true si se encontró y actualizó un documento, de lo contrario false
  }

  async delete(id: string): Promise<boolean> {
    const _id = new Types.ObjectId(id);
    const result = await this.salesModel.findByIdAndDelete(_id).exec();
    return result != null;
  }

  async isExists(reference: string): Promise<boolean> {
    const product = await this.salesModel.findOne({ reference: reference }).exec();
    return !!product;
  }
  
}