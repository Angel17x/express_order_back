import { HttpStatus, Injectable } from '@nestjs/common';
import { Response, response } from 'express'; 
@Injectable()
export class AppService {
  find(): Response<object> {
    return (
      response.status(HttpStatus.OK)
      .json(
        { 
          message: 'Welcome to the express order api', 
          status: HttpStatus.OK 
        }
      )
    );
  }
}
