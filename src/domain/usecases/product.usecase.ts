import { Catch, HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { ProductRepositoryImpl } from "src/infraestructure/repositories/product.repository.impl";
import { Product } from "../schemas/product.schema";
import { CreateProductDto } from "src/application/dto/create.product.dto";
import { UserRepositoryImpl } from "src/infraestructure/repositories/user.repository.impl";
import { Role } from "src/application/enums/role.enum";
import { User } from "../schemas/user.schema";
import { UploadUseCase } from "./upload.usecase";
import { UpdateProductDto } from "src/application/dto/update.product.dto";

@Injectable()
@Catch(HttpException)
export class ProductUseCase {
  constructor(
    private readonly productRepository: ProductRepositoryImpl,
    private readonly userRepository: UserRepositoryImpl,
    private readonly uploadfile: UploadUseCase
  ) { }


  async findAll(seller: string): Promise<Product[]> {
    try {
      const isEcommerce = await this.userRepository.findSellerById(seller);
      if (isEcommerce !== Role.ECOMMERCE) throw new HttpException(`Seller is not ecommerce`, HttpStatus.BAD_REQUEST);
      const repoProduct = await this.productRepository.findAll(seller);
      return repoProduct;

    } catch (error) {
      if (!error) throw new HttpException('Error getting products', HttpStatus.INTERNAL_SERVER_ERROR);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);

    }
  }

  async findById(id: string, seller: string): Promise<Product> {
    try {
      const isEcommerce = await this.userRepository.findSellerById(seller);
      if (isEcommerce !== Role.ECOMMERCE) throw new HttpException(`Seller is not ecommerce`, HttpStatus.BAD_REQUEST);
      const product = await this.productRepository.findById(id, seller);
      if(!product) throw new HttpException(`Product ID does not exist`, HttpStatus.NOT_FOUND)
      return product;
    } catch (error) {
      if (!error) throw new HttpException('Error when searching for product', HttpStatus.INTERNAL_SERVER_ERROR);
      if(error.name === 'QueryFailedError') throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(product: CreateProductDto, user: User, file: Express.Multer.File): Promise<Product> {
    try {
      if (product.seller !== user._id.toString()) throw new HttpException(`Seller ID does not match the authenticated user's ID`, HttpStatus.BAD_REQUEST);
      const isExistsProduct = await this.productRepository.isExists(product.name);
      if (isExistsProduct) throw new HttpException('Product is exists', HttpStatus.BAD_REQUEST);
      if (user.role !== Role.ECOMMERCE) throw new HttpException(`Seller is not ecommerce`, HttpStatus.BAD_REQUEST);
      if(!file) throw new HttpException('No se ha adjuntado un archivo', HttpStatus.NOT_FOUND);
      const fileUrl = await this.uploadfile.uploadFile(user._id.toString(), `product`, file, product.name)
      const newProduct = await this.productRepository.create(
        {
          name: product.name,
          category: product.category,
          description: product.description,
          price: product.price,
          stock: product.stock,
          brand: product.brand,
          seller: product.seller,
          rating: product.rating,
          weight: product.weight,
          type: product.type,
          imageUrl: fileUrl,
          createdAt: new Date(),
          modifiedAt: new Date()
        }
      );
      return newProduct;

    } catch (error) {
      if (!error) throw new HttpException('Error getting products', HttpStatus.INTERNAL_SERVER_ERROR);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id:string, product: UpdateProductDto, user: User, file?: Express.Multer.File): Promise<boolean> {
    try {
      if(!id) throw new HttpException(`Product ID not provided`, HttpStatus.NOT_FOUND);
      const isExistsProduct = await this.productRepository.findById(id, user._id.toString());
      if (!isExistsProduct) throw new HttpException(`Product ID does not exist`, HttpStatus.NOT_FOUND);
      if(file){
        const productUrl = await this.uploadfile.updateFile((user._id).toString(), 'product', file, product.name ?? isExistsProduct.name, product.name ?? isExistsProduct.name);
        product.imageUrl = productUrl;
      }
      const productUpdated = await this.productRepository.updateAt(
        id,
        {
          name: product.name ?? isExistsProduct.name,
          category: product.category ?? isExistsProduct.category,
          description: product.description ?? isExistsProduct.description,
          price: product.price ?? isExistsProduct.price,
          stock: product.stock ?? isExistsProduct.stock,
          brand: product.brand ?? isExistsProduct.brand,
          rating: product.rating ?? isExistsProduct.rating,
          weight: product.weight ?? isExistsProduct.weight.weight,
          type: product.type ?? isExistsProduct.weight.type,
          imageUrl: product.imageUrl ?? isExistsProduct.imageUrl,
          seller: product.seller ?? isExistsProduct.seller.toString(),
          modifiedAt: new Date()
        }
      );
      if(!productUpdated) throw new HttpException('Error updating product', HttpStatus.INTERNAL_SERVER_ERROR)
      return productUpdated;
    } catch (error) {
      console.log(error);
      if (!error) throw new HttpException('Error updating product', HttpStatus.INTERNAL_SERVER_ERROR);
      if(error.name === 'QueryFailedError') throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string, user: User): Promise<boolean> {
    try {
      if(!id) throw new HttpException(`Product ID not provided`, HttpStatus.NOT_FOUND);
      const isExistsProduct = await this.productRepository.findById(id, user._id.toString());
      if (!isExistsProduct) throw new HttpException(`Product ID does not exist`, HttpStatus.NOT_FOUND);
      const { imageUrl } = isExistsProduct;
      if(imageUrl){
        await this.uploadfile.deleteFile((user._id).toString(), 'product', isExistsProduct.name);
      }
      const productDeleted = await this.productRepository.delete(id);
      if(!productDeleted) throw new HttpException(`'The product ID you are trying to delete does not exist`, HttpStatus.NOT_FOUND)
      return productDeleted;
    } catch (error) {
      if (!error) throw new HttpException('Error deleting product', HttpStatus.INTERNAL_SERVER_ERROR);
      if(error.name === 'QueryFailedError') throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

