import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import jwtConfig from 'src/auth/config/jwt.config';
import { Request } from 'express';
import { access } from 'fs';
import { REQUEST_USER_KEY } from 'src/auth/constant/auth.constants';

@Injectable()
export class AccessTokenGuard implements CanActivate {

  constructor(

    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfigration: ConfigType<typeof jwtConfig>,
    
  ) { }

  /**
   * This method have to be implemented by all guards.
   * It is used to check if the token is valid or not.
   * If the token is valid, then the request is allowed.
   * If the token is not valid, then the request is denied.
   * @param context The execution context of the request.
   * @returns A boolean indicating if the request is allowed or not.
   */
  async canActivate(context: ExecutionContext,): Promise<boolean> {

    // extract the request from the execution context
    const request = context.switchToHttp().getRequest<Request>();

    // extract the tokoen from the header
    const token = this.extractTokenFromHeader(request);

    // validate the token
    try {
      const payload = await this.jwtService// user ID and email in payload
        .verifyAsync(token, this.jwtConfigration); 
      
      // set the payload in the request so, whenever i use access token i will be able to grab the user ID and email from the request
      request[REQUEST_USER_KEY] = payload;

    } catch {
      throw new UnauthorizedException();
    }

      return true;

  }



  /**
   * Helper method to extract the token from the request headers.
   * If the token is valid, then it is returned, otherwise undefined is returned.
   * @param request The request object.
   * @returns The token or undefined if the token is invalid.
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    
    // We expect the authorization header to be in the format of "Bearer <token>",
    // so we split it and get the second part, which is the token.
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    // const [_, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }


}
