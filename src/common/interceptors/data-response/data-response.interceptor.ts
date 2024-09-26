import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, Observable } from 'rxjs';

@Injectable()
export class DataResponseInterceptor implements NestInterceptor {
  constructor(private readonly configService: ConfigService) { }

  /**
   * Intercepts the response to add an API version to the data being returned.
   * @param context The execution context of the request, providing access to the request and response objects.
   * @param next The next call handler to invoke, allowing the request to continue.
   * @returns An observable that transforms the response data to include the API version.
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Handle the request and modify the response data using the map operator
    return next.handle().pipe(
      map((data) => ({
        // Retrieve the API version from the configuration using ConfigService
        apiVersion: this.configService.get('appConfig.apiVersion'),
        // Return the original data as part of the response
        data: data,
      }))
    );
  }

  /*
   * The map operator is used to transform the response data emitted by the observable.
   * In this case, it adds an apiVersion property retrieved from the ConfigService
   * and includes the original data in the response object.
   * 
   * Expected Output:
   * 
   * {
   *   "apiVersion": "0.1.1", // Example version from the app configuration
   *   "data": {              // The actual response data being returned from the handler
   *     "firstName": "Gulsum",
   *     "lastName": "SATIC",
   *     "email": "gulsum@stc.com",
   *     "id": 19             // Example ID returned from the database or service
   *   }
   * }
   */
}
