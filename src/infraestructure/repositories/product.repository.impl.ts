import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model, Types } from "mongoose";
import { CreateProductDto } from "src/application/dto/create.product.dto";
import { UpdateProductDto } from "src/application/dto/update.product.dto";
import { Weight } from "src/application/dto/weight.dto";
import { ProductRepository } from "src/domain/repositories/product.repository";
import { Product } from "src/domain/schemas/product.schema";

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>){}

  async findById(id: string, seller: string): Promise<Product | null> {
    const _id = new Types.ObjectId(id);
    return this.productModel.findOne({ _id, seller }, '-__v')
    .populate({ path: 'seller', select: '-password -__v' })
    .exec();
  }

  async findAll(seller: string): Promise<Product[]> {
    return await this.productModel.find({ seller }, '-__v')
    .populate({ path: 'seller', select: '-password -__v' })
    .exec();
  }

  async create(entity: CreateProductDto): Promise<Product> {
    const data = { ...entity, weight: { weight: entity.weight, type: entity.type } }
    const newUser = new this.productModel({_id: new mongoose.Types.ObjectId(), ...data});
    return newUser.save();
  }

  async updateAt(id: string, entity: UpdateProductDto): Promise<boolean> {
    const _id = new Types.ObjectId(id);
    const data = { ...entity, weight: { weight: entity.weight, type: entity.type } }
    const result = await this.productModel.findByIdAndUpdate(_id, data, { new: true }).exec();
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