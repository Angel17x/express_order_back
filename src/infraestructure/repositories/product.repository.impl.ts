import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model, Types } from "mongoose";
import { CreateProductDto } from "src/application/dto/create.product.dto";
import { ProductsWithEcommerceDto } from "src/application/dto/products-with-ecommerce.dto";
import { ProductRepository } from "src/domain/repositories/product.repository";
import { Product } from "src/domain/schemas/product.schema";

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>){}
  find(model: Product): Promise<Product> {
    throw new Error("Method not implemented.");
  }

  async findById(id: string, ecommerce: ProductsWithEcommerceDto): Promise<Product | null> {
    const _id = new Types.ObjectId(id);
    return this.productModel.findOne({ _id, ...ecommerce }).exec();
  }

  async findAll(ecommerce: ProductsWithEcommerceDto): Promise<Product[]> {
    return this.productModel.find({ ...ecommerce }).exec();
  }

  async create(entity: CreateProductDto): Promise<Product> {
    const newUser = new this.productModel({_id: new mongoose.Types.ObjectId(), ...entity});
    return newUser.save();
  }

  async updateAt(id: string, entity: CreateProductDto): Promise<boolean> {
    const _id = new Types.ObjectId(id);
    const result = await this.productModel.findByIdAndUpdate(_id, entity, { new: true }).exec();
    return result != null; // Devuelve true si se encontró y actualizó un documento, de lo contrario false
  }

  async delete(id: string): Promise<boolean> {
    const _id = new Types.ObjectId(id);
    const result = await this.productModel.findByIdAndDelete(_id).exec();
    return result != null;
  }

  async isExists(name: string): Promise<boolean> {
    const product = await this.productModel.findOne({ name: name }).exec();
    return !!product;
  }
  
}