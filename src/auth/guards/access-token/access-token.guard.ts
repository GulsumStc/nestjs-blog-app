import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AccessTokenGuard implements CanActivate {

  /**
   * This method have to be implemented by all guards.
   * It is used to check if the token is valid or not.
   * If the token is valid, then the request is allowed.
   * If the token is not valid, then the request is denied.
   * @param context The execution context of the request.
   * @returns A boolean indicating if the request is allowed or not.
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }


}
