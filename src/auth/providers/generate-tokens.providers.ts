import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { setDefaultAutoSelectFamilyAttemptTimeout } from 'net';

@Injectable()
export class GenerateTokensProviders {


  constructor(

    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfigration: ConfigType<typeof jwtConfig>,

  ) { }


  public async signTokren<T>(userId: number, expiresIn: number, payload?: T) {
    
    const refreshToken = await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload
      },
      {
        audience: this.jwtConfigration.audience,
        issuer: this.jwtConfigration.issuer,
        secret: this.jwtConfigration.secret,
        expiresIn: this.jwtConfigration.refreshTokenTTL
      }
    )
    return refreshToken;  
   
  }

}
