import { Catch, HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { ProductRepositoryImpl } from "src/infraestructure/repositories/product.repository.impl";
import { Product } from "../schemas/product.schema";
import { CreateProductDto } from "src/application/dto/create.product.dto";
import { UserRepositoryImpl } from "src/infraestructure/repositories/user.repository.impl";
import { Role } from "src/application/enums/role.enum";
import { ProductsWithEcommerceDto } from "src/application/dto/products-with-ecommerce.dto";
import { User } from "../schemas/user.schema";
import { UploadUseCase } from "./upload.usecase";

@Injectable()
@Catch(HttpException)
export class ProductUseCase {
  constructor(
    private readonly productRepository: ProductRepositoryImpl,
    private readonly userRepository: UserRepositoryImpl,
    private readonly uploadfile: UploadUseCase
  ) { }


  async findAll(ecommerce: ProductsWithEcommerceDto): Promise<Product[]> {
    try {
      const isEcommerce = await this.userRepository.findSellerById(ecommerce.seller.toString());
      if (isEcommerce !== Role.ECOMMERCE) throw new HttpException(`Seller is not ecommerce`, HttpStatus.BAD_REQUEST);
      const repoProduct = await this.productRepository.findAll(ecommerce);
      return repoProduct;

    } catch (error) {
      if (!error) throw new HttpException('Error getting products', HttpStatus.INTERNAL_SERVER_ERROR);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);

    }
  }

  async findById(id: string, ecommerce: ProductsWithEcommerceDto): Promise<Product> {
    try {
      const isEcommerce = await this.userRepository.findSellerById(ecommerce.seller.toString());
      if (isEcommerce !== Role.ECOMMERCE) throw new HttpException(`Seller is not ecommerce`, HttpStatus.BAD_REQUEST);
      const product = await this.productRepository.findById(id, ecommerce);
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
      if (product.seller !== user._id) throw new HttpException(`Seller ID does not match the authenticated user's ID`, HttpStatus.BAD_REQUEST);
      const isExistsProduct = await this.productRepository.isExists(product.name);
      if (isExistsProduct) throw new HttpException('Product is exists', HttpStatus.BAD_REQUEST);
      if (user.role !== Role.ECOMMERCE) throw new HttpException(`Seller is not ecommerce`, HttpStatus.BAD_REQUEST);
      const fileUrl = await this.uploadfile.uploadFile(user._id.toString(), `product/${product.name}`, file)
      const newProduct = await this.productRepository.create(
        {
          name: product.name,
          category: product.category,
          description: product.description,
          price: product.price,
          imageUrl: fileUrl,
          stock: product.stock,
          brand: product.brand,
          seller: product.seller
        }
      );
      return newProduct;

    } catch (error) {
      if (!error) throw new HttpException('Error getting products', HttpStatus.INTERNAL_SERVER_ERROR);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id:string, product: CreateProductDto, user: User): Promise<boolean> {
    try {
      const prod = new ProductsWithEcommerceDto(user._id)
      const isExistsProduct = await this.productRepository.findById(id, prod);
      if (!isExistsProduct) throw new HttpException(`Product ID does not exist`, HttpStatus.NOT_FOUND);
      const productUpdated = await this.productRepository.updateAt(
        id,
        {
          name: product.name,
          category: product.category,
          description: product.description,
          price: product.price,
          imageUrl: product.imageUrl,
          stock: product.stock,
          brand: product.brand,
          seller: product.seller
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

  async delete(id: string): Promise<boolean> {
    try {
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

