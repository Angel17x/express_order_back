import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { LoginDto } from "src/application/dto/login.dto";
import { UserDto } from "src/application/dto/user.dto";
import { UserRepository } from "src/domain/repositories/user.repository";
import { User } from "src/domain/schemas/user.schema";

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>){}
  
  
  async find(user: LoginDto): Promise<User> {
    return this.userModel.findOne(user as any).exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async create(entity: UserDto): Promise<User> {
    const newUser = new this.userModel(entity);
    return newUser.save();
  }

  async updateAt(id: string, entity: UserDto): Promise<boolean> {
    const _id = new Types.ObjectId(id);
    const result = await this.userModel.findByIdAndUpdate(_id, entity, { new: true }).exec();
    return result != null; // Devuelve true si se encontró y actualizó un documento, de lo contrario false
  }

  async delete(id: string): Promise<boolean> {
    const _id = new Types.ObjectId(id);
    const result = await this.userModel.findByIdAndDelete(_id).exec();
    return result != null;
  }

  async isExists(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email: email }).exec();
    return !!user;
  }

  async findSellerById(id: string): Promise<string | null> {
    const _id = new Types.ObjectId(id);
    const user = await this.userModel.findOne(_id).exec();
    return user.role;
  }
  
}