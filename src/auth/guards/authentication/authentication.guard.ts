import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AccessTokenGuard } from '../access-token/access-token.guard';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { AUTH_TYPE_KEY } from 'src/auth/constant/auth.constants';

/* it is a main guard as superset  */
@Injectable()
export class AuthenticationGuard implements CanActivate {

  private static readonly defaultAuthType = AuthType.BEARER;

  /*
  the authTypeGuardMap is a map holding guards according to different AutTtype enum. it is used to select appropriate guard based on different authentication strategy dynamically 
  Each AuthType key is associated with either a single Guard or an array of Guards implementing the CanActivate interface. 
  */
  private readonly authTypeGuardMap: Record<AuthType, CanActivate | CanActivate[]>= {
    [AuthType.BEARER]: this.accessTokenGuard,
    [AuthType.NONE]: {canActivate: () => true} // this is a simple guard which always returns true, no need authentication
  }

  constructor(
    private readonly reflector: Reflector,
    // it is a common practice to have other guards as dependecy inside the main guard
    private readonly accessTokenGuard: AccessTokenGuard// this has to be present aotherwise AuthenticationGuard will not work 


  ) { }

  /**
   * With this method, we determine whether requests pass authentication and authorization checks.
   * If the method returns true, need to authenticate the request.
   * If the method returns false, no need to authenticate the request. allow the request to pass.
   * @param context: the execution context
   * @returns  Promise<boolean>
   */
  async canActivate(context: ExecutionContext,): Promise<boolean> {
   
    /* get the auth types from reflector
       if there is no authtype key assigned to any of the class or the method of the class then it will return defaultAuthType which is BEARER
     */
    const authTypes = this.reflector.getAllAndOverride(
      AUTH_TYPE_KEY,
      [
        context.getHandler(), // this method responsible for getting all meta values which have key AUTH_TYPE_KEY
        context.getClass()  
      ]
    ) ?? [AuthenticationGuard.defaultAuthType]; 
    
    /* NOTE: if multiple auth types are specified (e.g., @Auth(AuthType.BEARER, AuthType.NONE)) and one of them is of public type the route becomes public  */
    
    // array of guards
    const guards = authTypes.map((type) => this.authTypeGuardMap[type]).flat();
    // console.log(guards); //array which contains instances of guards

    // default error
    const error = new UnauthorizedException();

    //loop guards canActivate
    /* if any of the instance  of each of the guards that have been applied to any controller method is set to none or returns true ,
       the user will be able to acess that resource  endpoint
    */
    for (const instance of guards) {
      const canActivate = await Promise.resolve(
         instance.canActivate(context)
      ).catch((err) => {
          error.message = err.message;
      });

      if (canActivate) {
        return true;
      }
    }

    throw error;
  }
}
