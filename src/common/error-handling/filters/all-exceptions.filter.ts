import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Default to internal server error
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Get exception details (includes stack trace)
    const { name, message, stack } = exception;

    response.status(status).json({
      statusCode: status,
      errorName: name,
      path: request.url,
      errorMessage: message,
      timestamp: new Date().toISOString(),
      stackTrace: stack.split('\n') // Sends stack trace as an array for readability
    });
  }
}
