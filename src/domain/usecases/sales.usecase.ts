import { Catch, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { SalesRepositoryImpl } from "src/infraestructure/repositories/sales.repository.impl";
import { Sales } from "../schemas/sales.schema";
import { CreateSalesDto } from "src/application/dto/create.sales.dto";
import { User } from "../schemas/user.schema";
import { PaymentStatus } from "src/application/enums/payment-status";

@Injectable()
@Catch(HttpException)
export class SalesUseCase {
  constructor(
    private readonly salesRepository: SalesRepositoryImpl,
  ) { }

  async findAll(userId: string): Promise<Sales[]> {
    try {
      const repoProduct = await this.salesRepository.findAll(userId);
      return repoProduct;

    } catch (error) {
      if (!error) throw new HttpException('Error getting products', HttpStatus.INTERNAL_SERVER_ERROR);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);

    }
  }

  async findById(id: string, userId: string): Promise<Sales> {
    try {
      const sale = await this.salesRepository.findById(id, userId);
      if(!sale) throw new HttpException(`Product ID does not exist`, HttpStatus.NOT_FOUND)
      return sale;
    } catch (error) {
      if (!error) throw new HttpException('Error when searching for sale', HttpStatus.INTERNAL_SERVER_ERROR);
      if(error.name === 'QueryFailedError') throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllByEcommerceId(ecommerce: string): Promise<Sales[]> {
    try {
      const repoProduct = await this.salesRepository.findAllByEcommerceId(ecommerce);
      return repoProduct;

    } catch (error) {
      if (!error) throw new HttpException('Error getting products', HttpStatus.INTERNAL_SERVER_ERROR);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);

    }
  }

  async findByIdEcommerceId(id: string, ecommerce: string): Promise<Sales> {
    try {
      const sale = await this.salesRepository.findByIdEcommerceId(id, ecommerce);
      if(!sale) throw new HttpException(`Product ID does not exist`, HttpStatus.NOT_FOUND)
      return sale;
    } catch (error) {
      if (!error) throw new HttpException('Error when searching for sale', HttpStatus.INTERNAL_SERVER_ERROR);
      if(error.name === 'QueryFailedError') throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(sale: CreateSalesDto, user: User): Promise<Sales> {
    try {
      if ((sale?.user ?? '') !== user._id.toString()) throw new HttpException(`userId ID does not match the authenticated user ID`, HttpStatus.BAD_REQUEST);
      const isExistsProduct = await this.salesRepository.isExists(sale.reference);
      if (isExistsProduct) throw new HttpException('sales reference is exists', HttpStatus.BAD_REQUEST);
      const newSale = await this.salesRepository.create(
        {
          user: sale.user,
          ecommerce: sale.ecommerce,
          createdAt: new Date(),
          modifiedAt: new Date(),
          totalAmount: sale.totalAmount,
          productsId: sale.productsId,
          bank: sale.bank,
          reference: sale.reference,
          paymentStatus: PaymentStatus.PENDING
        }
      );
      return newSale;

    } catch (error) {
      if (!error) throw new HttpException('Error create sale', HttpStatus.INTERNAL_SERVER_ERROR);
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}