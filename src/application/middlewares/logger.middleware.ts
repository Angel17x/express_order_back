import { HttpStatus, Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('http');
  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl } = req;
    const { ip } = req;
    const userAgent = req.get('user-agent') || '';

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');

      if (
        statusCode === HttpStatus.OK ||
        statusCode === HttpStatus.NO_CONTENT ||
        statusCode === HttpStatus.CREATED ||
        statusCode === HttpStatus.NOT_MODIFIED
      ) {
        this.logger.log(`${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`);
      } else {
        this.logger.error(`${method} ${originalUrl} ${statusCode} - ${userAgent} ${ip}`);
      }
      
    });

    next();
  }
}