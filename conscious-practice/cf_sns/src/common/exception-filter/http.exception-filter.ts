import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    const context = host.switchToHttp();
    const request = context.getRequest();
    const status = exception.getStatus();
    const response = context.getResponse();

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      timestamp: new Date().toLocaleDateString('kr'),
      path: request.url,
    });
  }
}
