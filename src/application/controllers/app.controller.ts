import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { Response } from 'express';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  find(): Response<object> {
    return this.appService.find();
  }
}
