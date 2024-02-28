import { Controller, Get, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
@Controller()
export class AppController {
  constructor() {}

  @Get('/')
  async init(): Promise<any> {
    return ({
      status: HttpStatus.OK,
      message: 'welcome to the application school'
    })
  }

  @Get('/test')
  async test(): Promise<any> {
    return ({
      status: HttpStatus.OK,
      message: 'welcome to the test route application school'
    })
  }
}
