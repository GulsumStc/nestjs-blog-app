import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';


@Injectable()
export class DataResponseInterceptor implements NestInterceptor {

  /**
   * Intercepts the request and logs a message before and after handling the request.
   * @param context The execution context of the request.
   * @param next The next call handler to invoke.
   * @returns An observable of the response of the request.
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Log message before the request is handled
    console.log("Before.....");

    // Handle the request and pipe the observable to tap into the response data
    return next.handle().pipe(
      // Use tap operator to log the response data after handling
      tap((data) => console.log("After.... ", data))
    );
  }

  


}
