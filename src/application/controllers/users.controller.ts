import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Post, Put, Query } from '@nestjs/common';
import { User } from 'src/domain/schemas/user.schema';
import { UserDto } from '../dto/user.dto';
import { UserServiceImpl } from '../services/users.service.impl';

@Controller()
export class UsersController {
  constructor(private readonly userService: UserServiceImpl) {}
  
  @Get('/users')
  getUserById(@Query('id') id: string): Promise<any> {
    return (id ? this.userService.findById(id) : this.userService.findAll());
  }

  @Post('/create-user')
  async create(@Body() user: UserDto): Promise<User> {
    return this.userService.create(user);
  }

  @Put('/update-user')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Query() id: string, @Body() user: UserDto): Promise<void> {
    await this.userService.updateAt(id, user);
  }

  @Delete('/delete-user')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Query() id: string): Promise<void> {
    await this.userService.delete(id);
  }
}
