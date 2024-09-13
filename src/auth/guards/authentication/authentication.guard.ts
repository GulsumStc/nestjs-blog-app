import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AccessTokenGuard } from '../access-token/access-token.guard';
import { AuthType } from 'src/auth/enums/auth-type.enum';

/* it is a main guard as superset  */
@Injectable()
export class AuthenticationGuard implements CanActivate {

  private static readonly defaultAuthType = AuthType.BEARER;

  /*
  the authTypeGuardMap is a map holding guards according to different AutTtype enum. it is used to select appropriate guard based on different authentication strategy dynamically 
  */
  private readonly authTypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  > = {

    [AuthType.BEARER]: this.accessTokenGuard,
    [AuthType.NONE]: {
      canActivate: () => true}
  }

  constructor(
    private readonly reflector: Reflector,
    // it is a common practice to have other guards as dependecy inside the main guard
    private readonly accessTokenGuard: AccessTokenGuard// this has to be present aotherwise AuthenticationGuard will not work 


  ) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log(this.authTypeGuardMap)
    return true;
  }
}

// Reflector inside Nestjs lets you access diffrent metadata from execution context